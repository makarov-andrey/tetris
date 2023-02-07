import json
import pickle
import sys

fillableCellsMinimumValuableHeightVariants = [5, 3, 7]
fillableCellsPowMultiplierVariants = [0, 1]
fillableCellsMultiplierVariants = [2, 1, 3]

filledHeightPowMultiplierVariants = [0, 1]
filledHeightMultiplierVariants = [3, 1, 5]

holesV1CountDecreaseMultiplierVariants = [150, 130, 170]
holesV1CountIncreaseMultiplierVariants = [70, 60, 80]
holesV1CoveredHeightPowMultiplierVariants = [0, 1]
holesV1CoveredHeightMultiplierVariants = [5, 3, 7]

squashedRowsMultiplierVariants = [10, 5, 15]

tunnelsMinimumValuableHeightVariants = [3, 2, 4]
tunnelsCountMultiplierVariants = [70, 40, 90]
tunnelsHeightPowMultiplierVariants = [1, 0]
tunnelsHeightMultiplierVariants = [7, 5, 10]

params_collection = set()
# params_collection = []
for squashedRowsMultiplier in squashedRowsMultiplierVariants:
    for tunnelsHeightPowMultiplier in tunnelsHeightPowMultiplierVariants:
        for holesV1CoveredHeightPowMultiplier in holesV1CoveredHeightPowMultiplierVariants:
            for fillableCellsPowMultiplier in fillableCellsPowMultiplierVariants:
                for filledHeightPowMultipliers in filledHeightPowMultiplierVariants:
                    for tunnelsMinimumValuableHeight in tunnelsMinimumValuableHeightVariants:
                        for tunnelsCountMultiplier in tunnelsCountMultiplierVariants:
                            for tunnelsHeightMultiplier in tunnelsHeightMultiplierVariants:
                                for filledHeightMultipliers in filledHeightMultiplierVariants:
                                    for holesV1CoveredHeightMultiplier in holesV1CoveredHeightMultiplierVariants:
                                        for holesV1CountDecreaseMultiplier in holesV1CountDecreaseMultiplierVariants:
                                            for holesV1CountIncreaseMultiplier in holesV1CountIncreaseMultiplierVariants:
                                                for fillableCellsMinimumValuableHeight in fillableCellsMinimumValuableHeightVariants:
                                                    for fillableCellsMultiplier in fillableCellsMultiplierVariants:
                                                        params_collection.add(','.join(map(str, [
                                                        # params_collection.append([
                                                            fillableCellsMinimumValuableHeight,
                                                            fillableCellsPowMultiplier,
                                                            fillableCellsMultiplier,
                                                            filledHeightPowMultipliers,
                                                            filledHeightMultipliers,
                                                            holesV1CountDecreaseMultiplier,
                                                            holesV1CountIncreaseMultiplier,
                                                            holesV1CoveredHeightPowMultiplier,
                                                            holesV1CoveredHeightMultiplier,
                                                            squashedRowsMultiplier,
                                                            tunnelsMinimumValuableHeight,
                                                            tunnelsCountMultiplier,
                                                            tunnelsHeightPowMultiplier,
                                                            tunnelsHeightMultiplier,
                                                        # ])
                                                        ])))

print('Params collected. Size: %s' % len(params_collection))

bench_result_file = open('../result.txt', 'r')
while True:
    line = bench_result_file.readline()
    if not line:
        break
    line_data = json.loads(line)
    params_collection.remove(','.join(map(str, line_data['par'])))
bench_result_file.close()

print('Removed already used in bench result. Remains: %s' % len(params_collection))

prediction_result_file = open('prediction_result.txt', 'r')
while True:
    line = prediction_result_file.readline()
    if not line:
        break
    line_data = json.loads(line)
    params_collection.remove(','.join(map(str, line_data['par'])))
prediction_result_file.close()

print('Removed already predicted. Remains: %s' % len(params_collection))


degree = sys.argv[1]
poly_model = pickle.load(open('models/%s_poly.sav' % degree, 'rb'))
regression_model = pickle.load(open('models/%s_regression.sav' % degree, 'rb'))

# poly_x = poly_model.fit_transform(params_collection)
# predictions = regression_model.predict(poly_x)
# results = []
# for i in range(0, len(params_collection)):
#     results.append([params_collection[i], predictions[i]])
#
# results.sort(key=lambda x: x[1], reverse=True)
# print(results[0:1000])

chunk_size = 1000
params_collection = list(map(lambda params : list(map(int, params.split(','))), params_collection))
prediction_result_file = open('prediction_result.txt', 'a')
for i in range(0, len(params_collection), chunk_size):
    chunk = params_collection[i:i + chunk_size]
    poly_x = poly_model.fit_transform(chunk)
    predictions = regression_model.predict(poly_x)
    for j in range(0, len(chunk)):
        json.dump({'par': chunk[j], 'res': predictions[j]}, prediction_result_file)
        prediction_result_file.write('\n')

    print('Another chunk processed. Remains to calculate: %s' % (len(params_collection) - i))


result = []
prediction_result_file = open('prediction_result.txt', 'r')
while True:
    line = prediction_result_file.readline()
    if not line:
        break
    line_data = json.loads(line)
    result.append([line_data['par'], line_data['res']])
prediction_result_file.close()

result.sort(key=lambda x:x[1], reverse=True)
for [param, avg] in result[:100]:
    print(param)
