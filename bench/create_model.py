import random
import sys

from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import pickle
import json

range_from = int(sys.argv[1])
range_to = int(sys.argv[2])
n_jobs = int(sys.argv[3])


def create_model(x, y, degree):
    poly_model = PolynomialFeatures(degree=degree)

    poly_x = poly_model.fit_transform(x)
    poly_model.fit(poly_x, y)

    regression_model = LinearRegression(n_jobs=n_jobs)
    regression_model.fit(poly_x, y)
    return [poly_model, regression_model]


file = open('../result.txt', 'r')

data = []
while True:
    line = file.readline()
    if not line:
        break

    line_data = json.loads(line)
    data.append([line_data['par'], line_data['res']['avg']])

file.close()

random.shuffle(data)
[x, y] = zip(*data)

# train_count = int(len(x) * 0.8)
# x_train = x[:train_count]
# y_train = y[:train_count]
# x_test = x[train_count:]
# y_test = y[train_count:]
x_train = x
y_train = y
x_test = x
y_test = y


min_error = 1000
min_error_degree = 0

max_score = 0
max_score_degree = 0

for degree in range(range_from, range_to + 1):
    [poly_model, regression_model] = create_model(x_train, y_train, degree)

    poly_x_test = poly_model.fit_transform(x_test)
    y_pred = regression_model.predict(poly_x_test)

    error = mean_squared_error(y_test, y_pred, squared=False)
    if error < min_error:
        min_error = error
        min_error_degree = degree

    score = regression_model.score(poly_x_test, y_test)
    if score > max_score:
        max_score = score
        max_score_degree = degree

    pickle.dump(poly_model, open("models/%s_poly.sav" % degree, 'wb'))
    pickle.dump(regression_model, open("models/%s_regression.sav" % degree, 'wb'))

    print('Degree: %s' % degree)
    print('Mean squared error: %s' % error)
    print('Score: %s' % score)
    print('Test: %s' % list(y_test[:10]))
    print('Pred: %s' % list(map(lambda x: round(x, 3), y_pred[:10])))
    print()
