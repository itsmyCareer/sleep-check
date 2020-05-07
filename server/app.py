# string 자료형을 dict로 변경해주는 라이브러리인 ast 을 이용함.
import ast
# MySQL과 python과 연결하는 pymysql 라이브러리를 이용함.
import pymysql
# Flask 라이브러리를 이용함.
from flask import Flask
from flask_restful import Resource, Api, reqparse

from datetime import datetime, timedelta

app = Flask(__name__)
api = Api(app)

# api.add_resource에서 사용될 클래스
class AboutData(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('data', action='append')
            args = parser.parse_args()
            data = args['data']
            print(data)
            print(type(data))
            con = pymysql.connect(host="localhost", user="root", password="pw123", db="rootdata", charset="utf8")
            cur = con.cursor()
            for i in data:
                userDict = ast.literal_eval(i)
                cur.execute('INSERT INTO user(sound, vibration, record_time) VALUES(%s, %s, %s)', (userDict['sound'], userDict['vibration'], userDict['record_time']))
            con.commit()
            con.close()
            return {'str': 'Success'}, 200
        
        except Exception as e:
            return {'error': str(e)}, 400
        
    def get(self):
        try:
            con = pymysql.connect(host="localhost", user="root", password="pw123", db="rootdata", charset="utf8")
            cur = con.cursor()
            cur.execute("SELECT * FROM user")
            rows = cur.fetchall()
            con.close()
            data = []
            for row in rows:
                json = {}
                json['sound'] = float(row[1])
                json['vibration'] = float(row[2])
                json['record_time'] = str(row[3])
                data.append(json)
            return {'data': data}, 200
        except Exception as e:
            return {'Error': e}, 400

class SearchData(Resource):
    def get(self, search_id):
        try:
            a = search_id[0:4]
            b = search_id[4:6]
            c = search_id[6:]
            con = pymysql.connect(host="localhost", user="root", password="pw123", db="rootdata", charset="utf8")
            cur = con.cursor()
            cur.execute("SELECT * FROM user WHERE record_time between '%s-%s-%s 00:00:00' and '%s-%s-%s 23:59:59'" % (a,b,c,a,b,c))
            #cur.execute("SELECT * FROM user WHERE record_time between '2020-05-01 00:00:00' and '2020-05-01 23:59:59'")
            rows = cur.fetchall()
            con.close()
            data = []
            for row in rows:
                json = {}
                json['sound'] = float(row[1])
                json['vibration'] = float(row[2])
                json['record_time'] = str(row[3])
                data.append(json)
            return {'data':data }, 200
        except Exception as e:
            return {'Error': e}, 400

class DeltaTime(Resource):
    def get(self, search_id):
        try:
            a = search_id[0:4]
            b = search_id[4:6]
            c = search_id[6:]
            con = pymysql.connect(host="localhost", user="root", password="pw123", db="rootdata", charset="utf8")
            cur = con.cursor()
            cur.execute("SELECT * FROM user WHERE record_time between '%s-%s-%s 00:00:00' and '%s-%s-%s 23:59:59'" % (a,b,c,a,b,c))

            rows = cur.fetchall()
            con.close()
            time_str1 = str(rows[0][3]).split(' ')
            time_str2 = str(rows[-1][3]).split(' ')
            time_str1[0] = time_str1[0].split('-')
            time_str1[1] = time_str1[1].split(':')
            time_str2[0] = time_str2[0].split('-')
            time_str2[1] = time_str2[1].split(':')

            time1 = datetime(int(time_str1[0][0]), int(time_str1[0][1]), int(time_str1[0][2]), int(time_str1[1][0]), int(time_str1[1][1]), int(time_str1[1][2]), )
            time2 = datetime(int(time_str2[0][0]), int(time_str2[0][1]), int(time_str2[0][2]), int(time_str2[1][0]), int(time_str2[1][1]), int(time_str2[1][2]), )
            timeR = time2-time1
            timeResult = str(timedelta(seconds=timeR.seconds))
            return {'data': timeResult}
            
        except Exception as e:
            return {'Error': e}, 400

api.add_resource(AboutData, '/data') # http://<주소>/data 로 접근하면 AboutData Class가 실행됨
api.add_resource(SearchData, '/data/<string:search_id>')
api.add_resource(DeltaTime, '/time/<string:search_id>')
# Flask 라이브러리를 이용함.
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0') # 서버를 염.
