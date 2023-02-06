import pickle
import sys

params = list(map(lambda x: int(x), sys.argv[1].split(',')))
degree = sys.argv[2]
print(degree, params)

poly_model = pickle.load(open('models/%s_poly.sav' % degree, 'rb'))
regression_model = pickle.load(open('models/%s_regression.sav' % degree, 'rb'))

poly_x = poly_model.fit_transform([params])
y_pred = regression_model.predict(poly_x)
print(y_pred[0])
