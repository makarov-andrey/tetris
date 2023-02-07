import json
import pickle
import sys

from sklearn.metrics import mean_squared_error

degree = sys.argv[1]

file = open('../result.txt', 'r')

x = []
y = []
while True:
    line = file.readline()
    if not line:
        break

    line_data = json.loads(line)
    x.append(line_data['par'])
    y.append(line_data['res']['avg'])

file.close()

# train_count = int(len(x) * 0.8)
# x_train = x[:train_count]
# y_train = y[:train_count]
# x_test = x[train_count:]
# y_test = y[train_count:]
x_train = x
y_train = y
x_test = x
y_test = y

poly_model = pickle.load(open('models/%s_poly.sav' % degree, 'rb'))
regression_model = pickle.load(open('models/%s_regression.sav' % degree, 'rb'))

poly_x_test = poly_model.fit_transform(x_test)
y_pred = regression_model.predict(poly_x_test)
error = mean_squared_error(y_test, y_pred, squared=False)
score = regression_model.score(poly_x_test, y_test)

print('Degree: %s' % degree)
print('Mean squared error: %s' % error)
print('Score: %s' % score)
print('Test: %s' % y_test[:15])
print('Pred: %s' % list(map(lambda x: round(x, 3), y_pred[:15])))
