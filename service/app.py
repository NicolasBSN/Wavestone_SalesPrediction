from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields
from sklearn.externals import joblib
import numpy as np
import sys

flask_app = Flask(__name__)
app = Api(app = flask_app, 
		  version = "0.1", 
		  title = "Sales Predictions", 
		  description = "Predict the sales of the company")

name_space = app.namespace('prediction', description='Prediction APIs')

# classifier = joblib.load('model.joblib')

@name_space.route("/")
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	def post(self):
		try: 
			formData = request.json
			data = [val for val in formData.values()]
			values_dict = {
				'0': 0,
				'a': 1,
				'b': 2,
				'c': 3,
				'd': 4,
			}
			data[4] = values_dict[data[4]]
			data[6] = values_dict[data[6]]
			data[7] = values_dict[data[7]]
			# prediction = model.predict(np.array(data).reshape(1, -1))
			response = jsonify({
				"statusCode": 200,
				"status": "Prediction made",
				"result": "The predict Sales are: " + prediction[0]]
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})