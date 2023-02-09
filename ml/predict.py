import pickle
import sys

params = list(map(lambda x: int(x), sys.argv[1].split(',')))
degree = sys.argv[2]
print(degree, params)

poly_model = pickle.load(open('models/%s_poly.sav' % degree, 'rb'))
regression_model = pickle.load(open('models/%s_regression.sav' % degree, 'rb'))

input_poly_x = poly_model.fit_transform([params])
input_y_pred = regression_model.predict(input_poly_x)
print(input_y_pred[0])
