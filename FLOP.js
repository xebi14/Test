if (myArr[0] == "FLOP") {
    var result = {};
    if (!myVal[2]) {
      myVal[2] = "empty";
      Promise.all([
        AlgorithmModel.create({
          cards_string: myVal[0],
          joins: myVal[1],
          colour: "requiredParams",
          type: "FLOP",
          full_string: myVal[2],
          //  flop_colour: myVal[2],
          //  flop_string: myVal[3],
        }),
      ])
        .then(function (result) {
          // console.log(result);
          // console.log("result");
        })
        .catch((e) => console.error(e));
    } else {
      Promise.all([
        AlgorithmModel.create({
          cards_string: myVal[0],
          joins: myVal[1],
          colour: "requiredParams",
          type: "FLOP",
          full_string: myVal[2],
          //  flop_colour: myVal[2],
          //  flop_string: myVal[3],
        }),
      ])
        .then(function (result) {
          const arrays = {};
          const regex = /\[\d+\.\d+\](.*?)\[\/\d+\.\d+\]/g;
          const matches = [];
          let match;
          //console.log("matches", myVal[2]);
          while ((match = regex.exec(myVal[2]))) {
            matches.push(match[0]);
          }
          const lastIndex = myVal[2].lastIndexOf("]");
          if (lastIndex !== -1) {
            const remaining = myVal[2].substring(lastIndex + 1);
            var lasts = remaining.substring(2);
            matches.push(lasts);
            //console.log(lasts); // Output: " character."
          } else {
            //console.log("']' not found in string");
          }
          // console.log("newtrims", lasts);
          const valData = typeof myVal[2];

          matches.map((newtrim, keyd) => {
            const newtrims = newtrim.split(",");
            if (newtrims[0].includes("[")) {
              // console.log(newtrims[0]);
              //console.log("The string contains the substring 'sample'");
            } else {
              newtrims[0] = `[100.00]${newtrims[0]}`;
              //console.log(newtrims[0]);
            }

            //console.log("newtrims", newtrims[0]);
            var key = newtrims[0].substring(
              newtrims[0].indexOf("[") + 1,
              newtrims[0].lastIndexOf("]")
            );
            //  console.log("keys", key);
            const finalarray = newtrim.split(",");
            const lasttrim = finalarray.length - 1;
            if (newtrims[lasttrim].includes("]")) {
              // console.log(newtrims[0]);
              //console.log("The string contains the substring 'sample'");
            } else {
              newtrims[lasttrim] = `${newtrims[lasttrim]}[/100.00]`;
              //console.log(newtrims[0]);
            }

            newtrims.map(async (arrayval, keyval) => {
              if (keyval == 0) {
                var firstValue = arrayval.split("]")[1];
                const myval = firstValue.split("");
                if (myval[0] == myval[2]) {
                  var strType = "combination";
                } else {
                  if (myval[1] == myval[3]) {
                    var strType = "suited";
                  } else {
                    var strType = "off";
                  }
                }
                var matrix = await MatrixModel.find({
                  $and: [{ value: firstValue }],
                });

                if (matrix.length > 0) {
                  var matrixData = matrix[0].name;
                } else {
                  //console.log("newStr", firstValue);
                  let firstTwo = firstValue.slice(0, 2); // "he"
                  let lastTwo = firstValue.slice(2); // "lo"
                  let stringWithSpaces = `${lastTwo}${firstTwo}`;
                  let newStr = stringWithSpaces.replace(/\s/g, "");
                  //console.log("newStr1", newStr);
                  var matrix = await MatrixModel.find({
                    $and: [{ value: newStr }],
                  });
                  if (matrix.length > 0) {
                    var matrixData = matrix[0].name;
                  } else {
                    var matrixData = "";
                  }
                }

                Promise.all([
                  AlgoStringModel.create({
                    algorithm_id: result[0]._id,
                    matrix: matrixData,
                    key: key,
                    value: firstValue,
                    type: strType || "null",
                  }),
                ])
                  .then(function (result) {})
                  .catch((e) => console.error(e));
              } else if (keyval == lasttrim) {
                const lastValue = arrayval.substr(0, arrayval.indexOf("["));
                const myval = lastValue.split("");

                if (myval[1] == myval[3]) {
                  var strType = "combination";
                } else {
                  if (myval[2] == myval[4]) {
                    var strType = "suited";
                  } else {
                    var strType = "off";
                  }
                }

                var matrix = await MatrixModel.find({
                  $and: [{ value: lastValue }],
                });
                if (matrix.length > 0) {
                  var matrixData = matrix[0].name;
                } else {
                  let firstTwo = lastValue.slice(0, 3); // "he"
                  let lastTwo = lastValue.slice(3); // "lo"
                  let stringWithSpaces = `${lastTwo}${firstTwo}`;
                  let newStr = stringWithSpaces.replace(/\s/g, "");
                  //console.log("lastValue", lastValue);
                  var matrix = await MatrixModel.find({
                    $and: [{ value: newStr }],
                  });
                  var matrixData = matrix[0].name;
                }

                Promise.all([
                  AlgoStringModel.create({
                    algorithm_id: result[0]._id,
                    matrix: matrixData,
                    key: key,
                    value: lastValue || "empty",
                    type: strType || "null",
                  }),
                ])
                  .then(function (result) {})
                  .catch((e) => console.error(e));
              } else {
                const myval = arrayval.split("");

                if (myval[1] == myval[3]) {
                  var strType = "combination";
                } else {
                  if (myval[2] == myval[4]) {
                    var strType = "suited";
                  } else {
                    var strType = "off";
                  }
                }
                var matrix = await MatrixModel.find({
                  $and: [{ value: arrayval }],
                });
                if (matrix.length > 0) {
                  var matrixData = matrix[0].name;
                } else {
                  let firstTwo = arrayval.slice(0, 3); // "he"
                  let lastTwo = arrayval.slice(3); // "lo"

                  let stringWithSpaces = `${lastTwo}${firstTwo}`;
                  let newStr = stringWithSpaces.replace(/\s/g, "");

                  // console.log("arrayval", arrayval);
                  // console.log("arrayval1", newStr);
                  var matrix = await MatrixModel.find({
                    $and: [{ value: newStr }],
                  });
                  if (matrix.length > 0) {
                    var matrixData = matrix[0].name;
                  } else {
                    var matrixData = "";
                  }
                }

                Promise.all([
                  AlgoStringModel.create({
                    algorithm_id: result[0]._id,
                    matrix: matrixData,
                    key: key,
                    value: arrayval || "empty",
                    type: strType || "null",
                  }),
                ])
                  .then(function (result) {})
                  .catch((e) => console.error(e));
              }
            });
          });
          MatrixModel.find({}, function (err, docs) {
            if (err) {
              console.log(err);
            } else {
              //console.log("value", result[0]._id);
              //console.log("value", docs[0].value);
              docs.map(async (values, idx) => {
                const output = await AlgoStringModel.find({
                  $and: [
                    { algorithm_id: result[0]._id },
                    { value: values.value },
                  ],
                });
                let firstTwo = values.value.slice(0, 2); // "he"
                let lastTwo = values.value.slice(2); // "lo"
                let stringWithSpaces = `${lastTwo}${firstTwo}`;
                let newStr = stringWithSpaces.replace(/\s/g, "");
                // console.log("lastValue", newStr);
                const checkput = await AlgoStringModel.find({
                  $and: [
                    { algorithm_id: result[0]._id },
                    { value: newStr },
                  ],
                });
                if (output.length > 0) {
                  //console.log("value", "1");
                } else if (checkput.length > 0) {
                  // console.log("value", "1");
                } else {
                  Promise.all([
                    AlgoStringModel.create({
                      algorithm_id: result[0]._id,
                      matrix: values.name,
                      key: "",
                      value: values.value,
                      type: values.type || "null",
                    }),
                  ])
                    .then(function (result) {})
                    .catch((e) => console.error(e));
                }
              });
            }
          });
        })
        .catch((e) => console.error(e));
    }
  } else if (myArr[0] == "TURN") {
    var result = {};
    if (!myVal[2]) {
      myVal[2] = "empty";
    }
    if (!myVal[1]) {
      myVal[1] = "empty";
    }
    Promise.all([
      AlgorithmModel.create({
        cards_string: myVal[0],
        joins: "myVal[1]",
        colour: "requiredParams",
        type: "TURN",
        full_string: myVal[2],
      }),
    ])
      .then(function (result) {
        const arrays = {};
        const regex = /\[\d+\.\d+\](.*?)\[\/\d+\.\d+\]/g;
        const matches = [];
        let match;
        while ((match = regex.exec(myVal[2]))) {
          matches.push(match[0]);
        }
        const valData = typeof myVal[2];
        const newtrims = myVal[2].split(",");

        var key = newtrims[0].substring(
          newtrims[0].indexOf("[") + 1,
          newtrims[0].lastIndexOf("]")
        );
        matches.map((newtrim, keyd) => {
          const finalarray = newtrim.split(",");
          const lasttrim = finalarray.length - 1;
          finalarray.map(async (arrayval, keyval) => {
            if (keyval == 0) {
              var firstValue = arrayval.split("]")[1];
              const myval = firstValue.split("");
              if (myval[0] == myval[2]) {
                var strType = "combination";
              } else {
                if (myval[1] == myval[3]) {
                  var strType = "suited";
                } else {
                  var strType = "off";
                }
              }
              var matrix = await MatrixModel.find({
                $and: [{ value: firstValue }],
              });
              if (matrix.length > 0) {
                var matrixData = matrix[0].name;
              } else {
                let firstTwo = firstValue.slice(0, 3); // "he"
                let lastTwo = firstValue.slice(3); // "lo"
                let stringWithSpaces = `${lastTwo}${firstTwo}`;
                let newStr = stringWithSpaces.replace(/\s/g, "");
                var matrix = await MatrixModel.find({
                  $and: [{ value: newStr }],
                });
                if (matrix.length > 0) {
                  var matrixData = matrix[0].name;
                } else {
                  var matrixData = "";
                }
              }

              Promise.all([
                AlgoStringModel.create({
                  algorithm_id: result[0]._id,
                  matrix: matrixData,
                  key: key,
                  value: firstValue,
                  type: strType || "null",
                }),
              ])
                .then(function (result) {})
                .catch((e) => console.error(e));
            } else if (keyval == lasttrim) {
              const lastValue = arrayval.substr(0, arrayval.indexOf("["));
              const myval = lastValue.split("");

              if (myval[1] == myval[3]) {
                var strType = "combination";
              } else {
                if (myval[2] == myval[4]) {
                  var strType = "suited";
                } else {
                  var strType = "off";
                }
              }
              var matrix = await MatrixModel.find({
                $and: [{ value: lastValue }],
              });
              if (matrix.length > 0) {
                var matrixData = matrix[0].name;
              } else {
                let firstTwo = lastValue.slice(0, 3); // "he"
                let lastTwo = lastValue.slice(3); // "lo"
                let stringWithSpaces = `${lastTwo}${firstTwo}`;
                let newStr = stringWithSpaces.replace(/\s/g, "");
                var matrix = await MatrixModel.find({
                  $and: [{ value: newStr }],
                });
                if (matrix.length > 0) {
                  var matrixData = matrix[0].name;
                } else {
                  var matrixData = "";
                }
              }

              Promise.all([
                AlgoStringModel.create({
                  algorithm_id: result[0]._id,
                  matrix: matrixData,
                  key: key,
                  value: lastValue || "empty",
                  type: strType || "null",
                }),
              ])
                .then(function (result) {})
                .catch((e) => console.error(e));
            } else {
              const myval = arrayval.split("");

              if (myval[1] == myval[3]) {
                var strType = "combination";
              } else {
                if (myval[2] == myval[4]) {
                  var strType = "suited";
                } else {
                  var strType = "off";
                }
              }
              var matrix = await MatrixModel.find({
                $and: [{ value: arrayval }],
              });
              if (matrix.length > 0) {
                var matrixData = matrix[0].name;
              } else {
                let firstTwo = arrayval.slice(0, 3); // "he"
                let lastTwo = arrayval.slice(3); // "lo"
                let stringWithSpaces = `${lastTwo}${firstTwo}`;
                let newStr = stringWithSpaces.replace(/\s/g, "");
                var matrix = await MatrixModel.find({
                  $and: [{ value: newStr }],
                });
                if (matrix.length > 0) {
                  var matrixData = matrix[0].name;
                } else {
                  var matrixData = "";
                }
              }

              Promise.all([
                AlgoStringModel.create({
                  algorithm_id: result[0]._id,
                  matrix: matrixData,
                  key: key,
                  value: arrayval || "empty",
                  type: strType || "null",
                }),
              ])
                .then(function (result) {})
                .catch((e) => console.error(e));
            }
          });
        });
        MatrixModel.find({}, function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            //console.log("value", result[0]._id);
            //console.log("value", docs[0].value);
            docs.map(async (values, idx) => {
              const output = await AlgoStringModel.find({
                $and: [
                  { algorithm_id: result[0]._id },
                  { value: values.value },
                ],
              });
              let firstTwo = values.value.slice(0, 2); // "he"
              let lastTwo = values.value.slice(2); // "lo"
              let stringWithSpaces = `${lastTwo}${firstTwo}`;
              let newStr = stringWithSpaces.replace(/\s/g, "");
              //console.log("lastValue", newStr);
              const checkput = await AlgoStringModel.find({
                $and: [{ algorithm_id: result[0]._id }, { value: newStr }],
              });
              if (output.length > 0) {
                //console.log("value", "1");
              } else if (checkput.length > 0) {
                //console.log("value", "1");
              } else {
                Promise.all([
                  AlgoStringModel.create({
                    algorithm_id: result[0]._id,
                    matrix: values.name,
                    key: "",
                    value: values.value,
                    type: values.type || "null",
                  }),
                ])
                  .then(function (result) {})
                  .catch((e) => console.error(e));
              }
            });
          }
        });
      })
      .catch((e) => console.error(e));
  } else if (myArr[0] == "RIVER") {
    if (!myVal[2]) {
      myVal[2] = "empty";
    }
    if (!myVal[1]) {
      myVal[1] = "empty";
    }
    Promise.all([
      AlgorithmModel.create({
        cards_string: myVal[0],
        joins: myVal[1],
        colour: "requiredParams",
        type: "RIVER",
        full_string: myVal[2],
      }),
    ])
      .then(function (result) {
        const arrays = {};
        const regex = /\[\d+\.\d+\](.*?)\[\/\d+\.\d+\]/g;
        const matches = [];
        let match;
        while ((match = regex.exec(myVal[2]))) {
          matches.push(match[0]);
        }
        const valData = typeof myVal[2];

        matches.map((newtrim, keyd) => {
          const newtrims = newtrim.split(",");
          var key = newtrims[0].substring(
            newtrims[0].indexOf("[") + 1,
            newtrims[0].lastIndexOf("]")
          );
          const finalarray = newtrim.split(",");
          const lasttrim = finalarray.length - 1;
          //console.log("matches", finalarray);
          finalarray.map(async (arrayval, keyval) => {
            //console.log(keyval);
            if (keyval == 0) {
              var firstValue = arrayval.split("]")[1];
              if (firstValue.includes("[/")) {
                const checkvals = firstValue.split("[/");
                firstValue = checkvals[0];
                key = checkvals[1];
              }
              const myval = firstValue.split("");
              //console.log("key", key);
              if (myval[0] == myval[2]) {
                var strType = "combination";
              } else {
                if (myval[1] == myval[3]) {
                  var strType = "suited";
                } else {
                  var strType = "off";
                }
              }
              var matrix = await MatrixModel.find({
                $and: [{ value: firstValue }],
              });
              if (matrix.length > 0) {
                var matrixData = matrix[0].name;
              } else {
                let firstTwo = firstValue.slice(0, 2); // "he"
                let lastTwo = firstValue.slice(2); // "lo"
                let stringWithSpaces = `${lastTwo}${firstTwo}`;
                let newStr = stringWithSpaces.replace(/\s/g, "");
                //console.log("matches3", newStr);
                var matrix = await MatrixModel.find({
                  $and: [{ value: newStr }],
                });
                if (matrix.length > 0) {
                  var matrixData = matrix[0].name;
                } else {
                  //  console.log("newStr", newStr);
                  var matrixData = "";
                }
              }

              Promise.all([
                AlgoStringModel.create({
                  algorithm_id: result[0]._id,
                  matrix: matrixData,
                  key: key,
                  value: firstValue,
                  type: strType || "null",
                }),
              ])
                .then(function (result) {})
                .catch((e) => console.error(e));
            } else if (keyval == lasttrim) {
              const lastValue = arrayval.substr(0, arrayval.indexOf("["));
              const myval = lastValue.split("");

              if (myval[1] == myval[3]) {
                var strType = "combination";
              } else {
                if (myval[2] == myval[4]) {
                  var strType = "suited";
                } else {
                  var strType = "off";
                }
              }
              var matrix = await MatrixModel.find({
                $and: [{ value: lastValue }],
              });
              if (matrix.length > 0) {
                var matrixData = matrix[0].name;
              } else {
                let firstTwo = lastValue.slice(0, 3); // "he"
                let lastTwo = lastValue.slice(3); // "lo"
                let stringWithSpaces = `${lastTwo}${firstTwo}`;
                let newStr = stringWithSpaces.replace(/\s/g, "");
                console.log("matches2", newStr);
                var matrix = await MatrixModel.find({
                  $and: [{ value: newStr }],
                });
                if (matrix.length > 0) {
                  var matrixData = matrix[0].name;
                } else {
                  var matrixData = "";
                  //  console.log("newStr", newStr);
                }
              }

              Promise.all([
                AlgoStringModel.create({
                  algorithm_id: result[0]._id,
                  matrix: matrixData,
                  key: key,
                  value: lastValue || "empty",
                  type: strType || "null",
                }),
              ])
                .then(function (result) {})
                .catch((e) => console.error(e));
            } else {
              const myval = arrayval.split("");

              if (myval[1] == myval[3]) {
                var strType = "combination";
              } else {
                if (myval[2] == myval[4]) {
                  var strType = "suited";
                } else {
                  var strType = "off";
                }
              }
              var matrix = await MatrixModel.find({
                $and: [{ value: arrayval }],
              });
              if (matrix.length > 0) {
                var matrixData = matrix[0].name;
              } else {
                let firstTwo = arrayval.slice(0, 3); // "he"
                let lastTwo = arrayval.slice(3); // "lo"
                let stringWithSpaces = `${lastTwo}${firstTwo}`;
                let newStr = stringWithSpaces.replace(/\s/g, "");
                console.log("newStr", newStr);
                var matrix = await MatrixModel.find({
                  $and: [{ value: newStr }],
                });
                if (matrix.length > 0) {
                  var matrixData = matrix[0].name;
                } else {
                  var matrixData = "";
                }
              }
              Promise.all([
                AlgoStringModel.create({
                  algorithm_id: result[0]._id,
                  matrix: matrixData,
                  key: key,
                  value: arrayval || "empty",
                  type: strType || "null",
                }),
              ])
                .then(function (result) {})
                .catch((e) => console.error(e));
            }
          });
        });
        MatrixModel.find({}, function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            //console.log("value", result[0]._id);
            //console.log("value", docs[0].value);
            docs.map(async (values, idx) => {
              const output = await AlgoStringModel.find({
                $and: [
                  { algorithm_id: result[0]._id },
                  { value: values.value },
                ],
              });
              let firstTwo = values.value.slice(0, 2); // "he"
              let lastTwo = values.value.slice(2); // "lo"
              let stringWithSpaces = `${lastTwo}${firstTwo}`;
              let newStr = stringWithSpaces.replace(/\s/g, "");
              console.log("lastValue3", newStr);
              const checkput = await AlgoStringModel.find({
                $and: [{ algorithm_id: result[0]._id }, { value: newStr }],
              });
              if (output.length > 0) {
                //console.log("value", "1");
              } else if (checkput.length > 0) {
                //console.log("value", "1");
              } else {
                Promise.all([
                  AlgoStringModel.create({
                    algorithm_id: result[0]._id,
                    matrix: values.name,
                    key: "",
                    value: values.value,
                    type: values.type || "null",
                  }),
                ])
                  .then(function (result) {})
                  .catch((e) => console.error(e));
              }
            });
          }
        });
      })
      .catch((e) => console.error(e));
  }
