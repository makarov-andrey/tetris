import os
import pickle
import sys

import psycopg2
from sklearn.metrics import mean_squared_error

degree = sys.argv[1]

conn = psycopg2.connect(
    host=os.environ["PGHOST"],
    database=os.environ["PGDATABASE"],
    user=os.environ["PGUSER"],
    password=os.environ["PGPASSWORD"],
    port=os.environ["PGPORT"]
)
cursor = conn.cursor()
cursor.execute("SELECT run_parameters, (select avg(v) from unnest(fallen_figures_per_runs) g(v)) as avg FROM tetris_solve_load.runs")
data = cursor.fetchall()
[x, y] = zip(*data)

poly_model = pickle.load(open('models/%s_poly.sav' % degree, 'rb'))
regression_model = pickle.load(open('models/%s_regression.sav' % degree, 'rb'))

poly_x_test = poly_model.fit_transform(x)
y_pred = regression_model.predict(poly_x_test)
error = mean_squared_error(y, y_pred, squared=False)
score = regression_model.score(poly_x_test, y)

print('Degree: %s' % degree)
print('Mean squared error: %s' % error)
print('Score: %s' % score)
print('Test: %s' % y[:15])
print('Pred: %s' % list(map(lambda val: round(val, 3), y_pred[:15])))
