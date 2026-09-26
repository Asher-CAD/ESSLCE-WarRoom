import { ENGLISH_DETAILS } from './englishDetails.js'
// ESSLCE-WarRoom shared curriculum source of truth.
// Built from the supplied Ethiopian textbook analysis + supplied textbook TOCs.
// Frontend and backend both import this exact file.
// No /api/chapters or legacy lowdb curriculum data is used for curriculum display.

const MAP = {
  "Mathematics": {
    "9": {
      "bookTitle": "Grade 9 Maths Student Textbook 2Aug22.pdf",
      "units": [
        {
          "id": "G9-MATH-U1A",
          "number": "1'",
          "title": "Further on Sets",
          "startPage": 1,
          "endPage": 16,
          "sections": [
            {
              "id": "G9-MATH-U1A-S1",
              "title": "1'.1 Description of the Concept Set",
              "startPage": 2
            },
            {
              "id": "G9-MATH-U1A-S2",
              "title": "1'.2 Notion of Set",
              "startPage": 5
            },
            {
              "id": "G9-MATH-U1A-S3",
              "title": "1'.3 Operations on Sets",
              "startPage": 9
            },
            {
              "id": "G9-MATH-U1A-S4",
              "title": "1'.4 Application of Operations on Sets",
              "startPage": 14
            }
          ]
        },
        {
          "id": "G9-MATH-U1",
          "number": "1",
          "title": "The Number System",
          "startPage": 17,
          "endPage": 86,
          "sections": [
            {
              "id": "G9-MATH-U1-S1",
              "title": "1.1 Revision on Natural Numbers and Integers",
              "startPage": 18
            },
            {
              "id": "G9-MATH-U1-S1A",
              "title": "1.1.1 Euclid's Division Lemma",
              "startPage": 19
            },
            {
              "id": "G9-MATH-U1-S1B",
              "title": "1.1.2 Prime Numbers and Composite Numbers",
              "startPage": 21
            },
            {
              "id": "G9-MATH-U1-S2",
              "title": "1.2 Rational Numbers",
              "startPage": 32
            },
            {
              "id": "G9-MATH-U1-S3",
              "title": "1.3 Irrational Numbers",
              "startPage": 39
            },
            {
              "id": "G9-MATH-U1-S4",
              "title": "1.4 Real Numbers",
              "startPage": 48
            },
            {
              "id": "G9-MATH-U1-S5",
              "title": "1.5 Applications",
              "startPage": 80
            }
          ]
        },
        {
          "id": "G9-MATH-U2",
          "number": "2",
          "title": "Solving Equations",
          "startPage": 87,
          "endPage": 129,
          "sections": [
            {
              "id": "G9-MATH-U2-S1",
              "title": "2.1 Revision of Linear Equation in One Variable",
              "startPage": 88
            },
            {
              "id": "G9-MATH-U2-S2",
              "title": "2.2 Systems of Linear Equations in Two Variables",
              "startPage": 91
            },
            {
              "id": "G9-MATH-U2-S3",
              "title": "2.3 Solving Non-linear Equations",
              "startPage": 100
            },
            {
              "id": "G9-MATH-U2-S4",
              "title": "2.4 Some Applications of Solving Equations",
              "startPage": 120
            }
          ]
        },
        {
          "id": "G9-MATH-U3",
          "number": "3",
          "title": "Solving Inequalities",
          "startPage": 130,
          "endPage": 161,
          "sections": [
            {
              "id": "G9-MATH-U3-S1",
              "title": "3.1 Revision on Linear Inequalities in One Variable",
              "startPage": 131
            },
            {
              "id": "G9-MATH-U3-S2",
              "title": "3.2 Systems of Linear Inequalities in Two Variables",
              "startPage": 135
            },
            {
              "id": "G9-MATH-U3-S3",
              "title": "3.3 Inequalities Involving Absolute Value",
              "startPage": 144
            },
            {
              "id": "G9-MATH-U3-S4",
              "title": "3.4 Quadratic Inequalities",
              "startPage": 149
            },
            {
              "id": "G9-MATH-U3-S5",
              "title": "3.5 Applications on Equations",
              "startPage": 153
            }
          ]
        },
        {
          "id": "G9-MATH-U4",
          "number": "4",
          "title": "Introduction to Trigonometry",
          "startPage": 162,
          "endPage": 180,
          "sections": [
            {
              "id": "G9-MATH-U4-S1",
              "title": "4.1 Revision on Right-angled Triangles",
              "startPage": 163
            },
            {
              "id": "G9-MATH-U4-S2",
              "title": "4.2 The Trigonometric Ratios",
              "startPage": 167
            }
          ]
        },
        {
          "id": "G9-MATH-U5",
          "number": "5",
          "title": "Regular Polygons",
          "startPage": 181,
          "endPage": 208,
          "sections": [
            {
              "id": "G9-MATH-U5-S1",
              "title": "5.1 Sum of Interior Angles of Convex Polygons",
              "startPage": 182
            },
            {
              "id": "G9-MATH-U5-S2",
              "title": "5.2 Sum of Exterior Angles of Convex Polygons",
              "startPage": 189
            },
            {
              "id": "G9-MATH-U5-S3",
              "title": "5.3 Measures of Each Interior and Exterior Angle of a Regular Polygon",
              "startPage": 195
            },
            {
              "id": "G9-MATH-U5-S4",
              "title": "5.4 Properties of Regular Polygons",
              "startPage": 197
            }
          ]
        },
        {
          "id": "G9-MATH-U6",
          "number": "6",
          "title": "Congruency and Similarity",
          "startPage": 209,
          "endPage": 246,
          "sections": [
            {
              "id": "G9-MATH-U6-S1",
              "title": "6.1 Revision on Congruency of Triangles",
              "startPage": 210
            },
            {
              "id": "G9-MATH-U6-S2",
              "title": "6.2 Definition of Similar Figures",
              "startPage": 214
            },
            {
              "id": "G9-MATH-U6-S3",
              "title": "6.3 Theorems on Similar Plane Figures",
              "startPage": 219
            },
            {
              "id": "G9-MATH-U6-S4",
              "title": "6.4 Ratio of Perimeters of Similar Plane Figures",
              "startPage": 229
            },
            {
              "id": "G9-MATH-U6-S5",
              "title": "6.5 Ratio of Areas of Similar Plane Figures",
              "startPage": 232
            },
            {
              "id": "G9-MATH-U6-S6",
              "title": "6.6 Construction of Similar Plane Figures",
              "startPage": 236
            },
            {
              "id": "G9-MATH-U6-S7",
              "title": "6.7 Applications on Similarities",
              "startPage": 238
            }
          ]
        },
        {
          "id": "G9-MATH-U7",
          "number": "7",
          "title": "Vectors in Two Dimensions",
          "startPage": 247,
          "endPage": 278,
          "sections": [
            {
              "id": "G9-MATH-U7-S1",
              "title": "7.1 Scalar and Vector Quantities",
              "startPage": 248
            },
            {
              "id": "G9-MATH-U7-S2",
              "title": "7.2 Representation of a Vector",
              "startPage": 251
            },
            {
              "id": "G9-MATH-U7-S3",
              "title": "7.3 Vectors Operations",
              "startPage": 257
            },
            {
              "id": "G9-MATH-U7-S4",
              "title": "7.4 Position Vector",
              "startPage": 267
            },
            {
              "id": "G9-MATH-U7-S5",
              "title": "7.5 Applications of Vectors in Two Dimensions",
              "startPage": 272
            }
          ]
        },
        {
          "id": "G9-MATH-U8",
          "number": "8",
          "title": "Statistics and Probability",
          "startPage": 279,
          "endPage": 328,
          "sections": [
            {
              "id": "G9-MATH-U8-S1",
              "title": "8.1 Statistical Data",
              "startPage": 281
            },
            {
              "id": "G9-MATH-U8-S2",
              "title": "8.2 Probability",
              "startPage": 313
            }
          ]
        }
      ],
      "bookId": 3,
      "pdfPages": 337,
      "sourceStatus": "source-backed-map-derived-from-supplied-analysis",
      "note": ""
    },
    "10": {
      "bookTitle": "G10-Mathematics-STB-2023-web.pdf",
      "units": [
        {
          "id": "G10-MATH-U1",
          "number": "1",
          "title": "Relations and Functions",
          "startPage": 1,
          "endPage": 66,
          "sections": [
            {
              "id": "G10-MATH-U1-S1",
              "title": "1.1 Relations",
              "startPage": 2
            },
            {
              "id": "G10-MATH-U1-S2",
              "title": "1.2 Functions",
              "startPage": 17
            },
            {
              "id": "G10-MATH-U1-S3",
              "title": "1.3 Applications of Relations and Functions",
              "startPage": 50
            }
          ]
        },
        {
          "id": "G10-MATH-U2",
          "number": "2",
          "title": "Polynomial Functions",
          "startPage": 67,
          "endPage": 120,
          "sections": [
            {
              "id": "G10-MATH-U2-S1",
              "title": "2.1 Definition of Polynomial Function",
              "startPage": 68
            },
            {
              "id": "G10-MATH-U2-S2",
              "title": "2.2 Operations on polynomial functions",
              "startPage": 74
            },
            {
              "id": "G10-MATH-U2-S3",
              "title": "2.3 Theorem on polynomial functions",
              "startPage": 84
            },
            {
              "id": "G10-MATH-U2-S4",
              "title": "2.4 Zeros of polynomial functions",
              "startPage": 93
            },
            {
              "id": "G10-MATH-U2-S5",
              "title": "2.5 Graphs of polynomial functions",
              "startPage": 101
            },
            {
              "id": "G10-MATH-U2-S6",
              "title": "2.6 Applications",
              "startPage": 112
            }
          ]
        },
        {
          "id": "G10-MATH-U3",
          "number": "3",
          "title": "Exponential and Logarithmic Functions",
          "startPage": 121,
          "endPage": 198,
          "sections": [
            {
              "id": "G10-MATH-U3-S1",
              "title": "3.1 Exponents and Logarithms",
              "startPage": 122
            },
            {
              "id": "G10-MATH-U3-S2",
              "title": "3.2 The Exponential Functions and Their Graphs",
              "startPage": 153
            },
            {
              "id": "G10-MATH-U3-S3",
              "title": "3.3 The Logarithmic Functions and Their Graphs",
              "startPage": 163
            },
            {
              "id": "G10-MATH-U3-S4",
              "title": "3.4 Solving Exponential and Logarithmic Equations",
              "startPage": 172
            },
            {
              "id": "G10-MATH-U3-S5",
              "title": "3.5 Relation between Exponential and Logarithmic functions",
              "startPage": 178
            },
            {
              "id": "G10-MATH-U3-S6",
              "title": "3.6 Applications",
              "startPage": 182
            }
          ]
        },
        {
          "id": "G10-MATH-U4",
          "number": "4",
          "title": "Trigonometric Functions",
          "startPage": 199,
          "endPage": 250,
          "sections": [
            {
              "id": "G10-MATH-U4-S1",
              "title": "4.1 Radian Measure of angle",
              "startPage": 200
            },
            {
              "id": "G10-MATH-U4-S2",
              "title": "4.2 Basic Trigonometric Function",
              "startPage": 207
            },
            {
              "id": "G10-MATH-U4-S3",
              "title": "4.3 Trigonometric Identities & Equation",
              "startPage": 234
            },
            {
              "id": "G10-MATH-U4-S4",
              "title": "4.4 Application",
              "startPage": 242
            }
          ]
        },
        {
          "id": "G10-MATH-U5",
          "number": "5",
          "title": "Circles",
          "startPage": 251,
          "endPage": 286,
          "sections": [
            {
              "id": "G10-MATH-U5-S1",
              "title": "5.1 Symmetrical properties of circles",
              "startPage": 252
            },
            {
              "id": "G10-MATH-U5-S2",
              "title": "5.2 Angle properties of circles",
              "startPage": 258
            },
            {
              "id": "G10-MATH-U5-S3",
              "title": "5.3 Arc length, perimeters and areas of segments and sectors",
              "startPage": 268
            },
            {
              "id": "G10-MATH-U5-S4",
              "title": "5.4 Theorems on angles and arcs determined by lines intersecting inside, on and outside a circle",
              "startPage": 275
            }
          ]
        },
        {
          "id": "G10-MATH-U6",
          "number": "6",
          "title": "Solid Figures",
          "startPage": 287,
          "endPage": 344,
          "sections": [
            {
              "id": "G10-MATH-U6-S1",
              "title": "6.1 Revision of Cylinders and Prisms",
              "startPage": 288
            },
            {
              "id": "G10-MATH-U6-S2",
              "title": "6.2 Pyramids, cones and Spheres",
              "startPage": 294
            },
            {
              "id": "G10-MATH-U6-S3",
              "title": "6.3 Frustum of pyramids and cones",
              "startPage": 321
            },
            {
              "id": "G10-MATH-U6-S4",
              "title": "6.4 Surface areas and volumes of composed solids",
              "startPage": 331
            },
            {
              "id": "G10-MATH-U6-S5",
              "title": "6.5 Applications",
              "startPage": 336
            }
          ]
        },
        {
          "id": "G10-MATH-U7",
          "number": "7",
          "title": "Coordinate Geometry",
          "startPage": 345,
          "endPage": 380,
          "sections": [
            {
              "id": "G10-MATH-U7-S1",
              "title": "7.1 Distance between two points",
              "startPage": 347
            },
            {
              "id": "G10-MATH-U7-S2",
              "title": "7.2 Division of a line segment",
              "startPage": 351
            },
            {
              "id": "G10-MATH-U7-S3",
              "title": "7.3 Equation of a line",
              "startPage": 356
            },
            {
              "id": "G10-MATH-U7-S4",
              "title": "7.4 Slopes of parallel and perpendicular lines",
              "startPage": 365
            },
            {
              "id": "G10-MATH-U7-S5",
              "title": "7.5 Equation of a Circle",
              "startPage": 370
            },
            {
              "id": "G10-MATH-U7-S6",
              "title": "7.6 Applications",
              "startPage": 375
            }
          ]
        }
      ],
      "bookId": 7,
      "pdfPages": 394,
      "sourceStatus": "source-backed-map-derived-from-supplied-analysis",
      "note": ""
    },
    "11": {
      "bookId": 15,
      "bookTitle": "G11-Mathematics-STB-2023-web.pdf",
      "pdfPages": 494,
      "sourceStatus": "verified-from-supplied-textbook-TOC",
      "note": "Unit ranges are derived from the supplied textbook table of contents: each unit runs to the page before the next unit, with Unit 8 ending at the 494-page book boundary.",
      "units": [
        {
          "id": "G11-MATH-U1",
          "number": "1",
          "title": "RELATIONS AND FUNCTIONS",
          "startPage": 1,
          "endPage": 82,
          "sections": [
            {
              "id": "G11-MATH-U1-S1",
              "title": "1.1 Relations",
              "startPage": 3
            },
            {
              "id": "G11-MATH-U1-S2",
              "title": "1.2 Inverse of Relations and Their Graphs",
              "startPage": 12
            },
            {
              "id": "G11-MATH-U1-S3",
              "title": "1.3 Types of Functions",
              "startPage": 22
            },
            {
              "id": "G11-MATH-U1-S4",
              "title": "1.4 Composition of Functions",
              "startPage": 64
            },
            {
              "id": "G11-MATH-U1-S5",
              "title": "1.5 Inverse Functions and their Graphs",
              "startPage": 68
            },
            {
              "id": "G11-MATH-U1-S6",
              "title": "1.6 Applications of Relations and Functions",
              "startPage": 76
            }
          ]
        },
        {
          "id": "G11-MATH-U2",
          "number": "2",
          "title": "RATIONAL EXPRESSIONS AND RATIONAL FUNCTIONS",
          "startPage": 83,
          "endPage": 130,
          "sections": [
            {
              "id": "G11-MATH-U2-S1",
              "title": "2.1 Rational Expressions",
              "startPage": 84
            },
            {
              "id": "G11-MATH-U2-S2",
              "title": "2.2 Rational Equations and Rational Inequalities",
              "startPage": 102
            },
            {
              "id": "G11-MATH-U2-S3",
              "title": "2.3 Rational Functions and Their Graphs",
              "startPage": 109
            },
            {
              "id": "G11-MATH-U2-S4",
              "title": "2.4 Applications",
              "startPage": 124
            }
          ]
        },
        {
          "id": "G11-MATH-U3",
          "number": "3",
          "title": "MATRICES",
          "startPage": 131,
          "endPage": 206,
          "sections": [
            {
              "id": "G11-MATH-U3-S1",
              "title": "3.1 The Concepts of a Matrix",
              "startPage": 133
            },
            {
              "id": "G11-MATH-U3-S2",
              "title": "3.2 Operations on Matrices",
              "startPage": 137
            },
            {
              "id": "G11-MATH-U3-S3",
              "title": "3.3 Special Types of Matrices",
              "startPage": 157
            },
            {
              "id": "G11-MATH-U3-S4",
              "title": "3.4 Elementary Row Operations of Matrices",
              "startPage": 163
            },
            {
              "id": "G11-MATH-U3-S5",
              "title": "3.5 Systems of Linear Equations with Two or Three Variables",
              "startPage": 174
            },
            {
              "id": "G11-MATH-U3-S6",
              "title": "3.6 Solutions of Systems of Linear Equations",
              "startPage": 188
            },
            {
              "id": "G11-MATH-U3-S7",
              "title": "3.7 Inverse of a Square Matrix",
              "startPage": 192
            },
            {
              "id": "G11-MATH-U3-S8",
              "title": "3.8 Applications",
              "startPage": 199
            }
          ]
        },
        {
          "id": "G11-MATH-U4",
          "number": "4",
          "title": "DETERMINANTS AND THEIR PROPERTIES",
          "startPage": 207,
          "endPage": 250,
          "sections": [
            {
              "id": "G11-MATH-U4-S1",
              "title": "4.1 Determinants of Matrices of Order 2",
              "startPage": 209
            },
            {
              "id": "G11-MATH-U4-S2",
              "title": "4.2 Minors and Cofactors of Elements of Matrices",
              "startPage": 211
            },
            {
              "id": "G11-MATH-U4-S3",
              "title": "4.3 Determinants of Matrices of Order 3",
              "startPage": 214
            },
            {
              "id": "G11-MATH-U4-S4",
              "title": "4.4 Properties of Determinants",
              "startPage": 220
            },
            {
              "id": "G11-MATH-U4-S5",
              "title": "4.5 Inverse of a Square Matrix of Order 2 and 3",
              "startPage": 230
            },
            {
              "id": "G11-MATH-U4-S6",
              "title": "4.6 Solutions of Systems of Linear Equations Using Cramer’s Rule",
              "startPage": 235
            },
            {
              "id": "G11-MATH-U4-S7",
              "title": "4.7 Applications",
              "startPage": 242
            }
          ]
        },
        {
          "id": "G11-MATH-U5",
          "number": "5",
          "title": "VECTORS",
          "startPage": 251,
          "endPage": 312,
          "sections": [
            {
              "id": "G11-MATH-U5-S1",
              "title": "5.1 Revision on Vectors and Scalars",
              "startPage": 252
            },
            {
              "id": "G11-MATH-U5-S2",
              "title": "5.2 Representation of vectors",
              "startPage": 254
            },
            {
              "id": "G11-MATH-U5-S3",
              "title": "5.3 Vector Product",
              "startPage": 274
            },
            {
              "id": "G11-MATH-U5-S4",
              "title": "5.4 Application of Scalar and Cross Product",
              "startPage": 292
            },
            {
              "id": "G11-MATH-U5-S5",
              "title": "5.5 Application of Vectors",
              "startPage": 296
            },
            {
              "id": "G11-MATH-U5-S6",
              "title": "5.6 Applications",
              "startPage": 306
            }
          ]
        },
        {
          "id": "G11-MATH-U6",
          "number": "6",
          "title": "TRANSFORMATIONS OF THE PLANE",
          "startPage": 313,
          "endPage": 354,
          "sections": [
            {
              "id": "G11-MATH-U6-S1",
              "title": "6.1 Introduction",
              "startPage": 314
            },
            {
              "id": "G11-MATH-U6-S2",
              "title": "6.2 Translation",
              "startPage": 315
            },
            {
              "id": "G11-MATH-U6-S3",
              "title": "6.3 Reflection",
              "startPage": 322
            },
            {
              "id": "G11-MATH-U6-S4",
              "title": "6.4 Rotation",
              "startPage": 337
            },
            {
              "id": "G11-MATH-U6-S5",
              "title": "6.5 Applications",
              "startPage": 349
            }
          ]
        },
        {
          "id": "G11-MATH-U7",
          "number": "7",
          "title": "STATISTICS",
          "startPage": 355,
          "endPage": 412,
          "sections": [
            {
              "id": "G11-MATH-U7-S1",
              "title": "7.1 Types of Data",
              "startPage": 357
            },
            {
              "id": "G11-MATH-U7-S2",
              "title": "7.2 Introduction to Grouped Data",
              "startPage": 360
            },
            {
              "id": "G11-MATH-U7-S3",
              "title": "7.3 Graphical Representation of Grouped Data",
              "startPage": 368
            },
            {
              "id": "G11-MATH-U7-S4",
              "title": "7.4 Measures of Central Tendency and Their Interpretation",
              "startPage": 371
            },
            {
              "id": "G11-MATH-U7-S5",
              "title": "7.5 Real-life Application of Statistics",
              "startPage": 405
            }
          ]
        },
        {
          "id": "G11-MATH-U8",
          "number": "8",
          "title": "PROBABILITY",
          "startPage": 413,
          "endPage": 494,
          "sections": [
            {
              "id": "G11-MATH-U8-S1",
              "title": "8.1 Introduction",
              "startPage": 414
            },
            {
              "id": "G11-MATH-U8-S2",
              "title": "8.2 Fundamental Principle of Counting",
              "startPage": 417
            },
            {
              "id": "G11-MATH-U8-S3",
              "title": "8.3 Permutations and Combinations",
              "startPage": 423
            },
            {
              "id": "G11-MATH-U8-S4",
              "title": "8.4 Binomial Theorem",
              "startPage": 437
            },
            {
              "id": "G11-MATH-U8-S5",
              "title": "8.5 Random Experiments and Their Outcomes",
              "startPage": 440
            },
            {
              "id": "G11-MATH-U8-S6",
              "title": "8.6 Events",
              "startPage": 444
            },
            {
              "id": "G11-MATH-U8-S7",
              "title": "8.7 Probability of an Event",
              "startPage": 453
            },
            {
              "id": "G11-MATH-U8-S8",
              "title": "8.8 Real-life Application of Probability",
              "startPage": 473
            }
          ]
        }
      ]
    },
    "12": {
      "bookId": 16,
      "bookTitle": "G12-Mathematics-STB-2023-web (2).pdf",
      "pdfPages": 426,
      "sourceStatus": "verified-from-supplied-textbook-TOC",
      "note": "Unit ranges follow the supplied Grade 12 Mathematics table of contents and the 426-page textbook boundary.",
      "units": [
        {
          "id": "G12-MATH-U1",
          "number": "1",
          "title": "SEQUENCES AND SERIES",
          "startPage": 1,
          "endPage": 60,
          "sections": [
            {
              "id": "G12-MATH-U1-S1",
              "title": "1.1 Sequence",
              "startPage": 2
            },
            {
              "id": "G12-MATH-U1-S2",
              "title": "1.2 Arithmetic and Geometric Sequences",
              "startPage": 9
            },
            {
              "id": "G12-MATH-U1-S3",
              "title": "1.3 The Sigma Notation and Partial Sums",
              "startPage": 21
            },
            {
              "id": "G12-MATH-U1-S4",
              "title": "1.4 Infinite Series",
              "startPage": 35
            },
            {
              "id": "G12-MATH-U1-S5",
              "title": "1.5 Applications of Sequence and Series in Daily Life",
              "startPage": 44
            }
          ]
        },
        {
          "id": "G12-MATH-U2",
          "number": "2",
          "title": "INTRODUCTIONS TO CALCULUS",
          "startPage": 61,
          "endPage": 158,
          "sections": [
            {
              "id": "G12-MATH-U2-S1",
              "title": "2.1 Introduction to Derivatives",
              "startPage": 63
            },
            {
              "id": "G12-MATH-U2-S2",
              "title": "2.2 Application of Derivative",
              "startPage": 112
            },
            {
              "id": "G12-MATH-U2-S3",
              "title": "2.3 Introduction to Integration",
              "startPage": 123
            }
          ]
        },
        {
          "id": "G12-MATH-U3",
          "number": "3",
          "title": "STATISTICS",
          "startPage": 159,
          "endPage": 236,
          "sections": [
            {
              "id": "G12-MATH-U3-S1",
              "title": "3.1 Measures of Absolute Dispersions",
              "startPage": 161
            },
            {
              "id": "G12-MATH-U3-S2",
              "title": "3.2 Interpretation of Relative Dispersions",
              "startPage": 194
            },
            {
              "id": "G12-MATH-U3-S3",
              "title": "3.3 Use of Frequency Curves",
              "startPage": 206
            },
            {
              "id": "G12-MATH-U3-S4",
              "title": "3.4 Sampling Techniques",
              "startPage": 212
            }
          ]
        },
        {
          "id": "G12-MATH-U4",
          "number": "4",
          "title": "INTRODUCTION TO LINEAR PROGRAMMING",
          "startPage": 237,
          "endPage": 302,
          "sections": [
            {
              "id": "G12-MATH-U4-S1",
              "title": "4.1 Graphical Solutions of System of Linear Inequalities",
              "startPage": 239
            },
            {
              "id": "G12-MATH-U4-S2",
              "title": "4.2 Maximum and Minimum Values",
              "startPage": 260
            },
            {
              "id": "G12-MATH-U4-S3",
              "title": "4.3 Applications",
              "startPage": 274
            }
          ]
        },
        {
          "id": "G12-MATH-U5",
          "number": "5",
          "title": "MATHEMATICAL APPLICATIONS IN BUSINESS",
          "startPage": 303,
          "endPage": 426,
          "sections": [
            {
              "id": "G12-MATH-U5-S1",
              "title": "5.1 Basic Mathematical Concepts in Business",
              "startPage": 305
            },
            {
              "id": "G12-MATH-U5-S2",
              "title": "5.2 Time Value of Money",
              "startPage": 324
            },
            {
              "id": "G12-MATH-U5-S3",
              "title": "5.3 Saving, Investing and Borrowing Money",
              "startPage": 371
            },
            {
              "id": "G12-MATH-U5-S4",
              "title": "5.4 Taxation",
              "startPage": 391
            }
          ]
        }
      ]
    }
  },
  "Physics": {
    "9": {
      "bookId": 4,
      "bookTitle": "Physics  Grade 9 StudentTextbook Final version .pdf",
      "pdfPages": 179,
      "sourceStatus": "verified-from-supplied-textbook-TOC",
      "note": "The supplied Grade 9 Physics TOC includes the seven units and page starts captured here; the final content boundary is before the index.",
      "units": [
        {
          "id": "G9-PHYS-U1",
          "number": "1",
          "title": "Physics and Human Society",
          "startPage": 1,
          "endPage": 10,
          "sections": [
            {
              "id": "G9-PHYS-U1-S1",
              "title": "1.1 Definition and Nature of Physics",
              "startPage": 2
            },
            {
              "id": "G9-PHYS-U1-S2",
              "title": "1.2 Branches of Physics",
              "startPage": 2
            },
            {
              "id": "G9-PHYS-U1-S3",
              "title": "1.3 Related Fields to Physics",
              "startPage": 4
            },
            {
              "id": "G9-PHYS-U1-S4",
              "title": "1.4 Historical Issues and Contributors",
              "startPage": 5
            }
          ]
        },
        {
          "id": "G9-PHYS-U2",
          "number": "2",
          "title": "Physical Quantities",
          "startPage": 11,
          "endPage": 34,
          "sections": [
            {
              "id": "G9-PHYS-U2-S1",
              "title": "2.1 Scales, Standards, Units (prefixes)",
              "startPage": 12
            },
            {
              "id": "G9-PHYS-U2-S2",
              "title": "2.2 Measurement and Safety",
              "startPage": 17
            },
            {
              "id": "G9-PHYS-U2-S3",
              "title": "2.3 Classification of Physical Quantities",
              "startPage": 23
            },
            {
              "id": "G9-PHYS-U2-S4",
              "title": "2.4 Unit conversion",
              "startPage": 26
            }
          ]
        },
        {
          "id": "G9-PHYS-U3",
          "number": "3",
          "title": "Motion in a Straight Line",
          "startPage": 35,
          "endPage": 58,
          "sections": [
            {
              "id": "G9-PHYS-U3-S1",
              "title": "3.1 Position, Distance and Displacement",
              "startPage": 36
            },
            {
              "id": "G9-PHYS-U3-S2",
              "title": "3.2 Average Speed and Instantaneous Speed",
              "startPage": 41
            },
            {
              "id": "G9-PHYS-U3-S3",
              "title": "3.3 Average Velocity and Instantaneous Velocity",
              "startPage": 43
            },
            {
              "id": "G9-PHYS-U3-S4",
              "title": "3.4 Acceleration",
              "startPage": 46
            },
            {
              "id": "G9-PHYS-U3-S5",
              "title": "3.5 Uniform Motion",
              "startPage": 48
            },
            {
              "id": "G9-PHYS-U3-S6",
              "title": "3.6 Graphical Representation of Motion",
              "startPage": 49
            }
          ]
        },
        {
          "id": "G9-PHYS-U4",
          "number": "4",
          "title": "Force, Work, Energy and Power",
          "startPage": 59,
          "endPage": 80,
          "sections": [
            {
              "id": "G9-PHYS-U4-S1",
              "title": "4.1 The Concept of Force",
              "startPage": 60
            },
            {
              "id": "G9-PHYS-U4-S2",
              "title": "4.2 Newton’s Laws of Motion",
              "startPage": 63
            },
            {
              "id": "G9-PHYS-U4-S3",
              "title": "4.3 Forces of Friction",
              "startPage": 69
            },
            {
              "id": "G9-PHYS-U4-S4",
              "title": "4.4 The Concept of Work",
              "startPage": 70
            },
            {
              "id": "G9-PHYS-U4-S5",
              "title": "4.5 Kinetic and Potential Energies",
              "startPage": 72
            },
            {
              "id": "G9-PHYS-U4-S6",
              "title": "4.6 Power",
              "startPage": 76
            }
          ]
        },
        {
          "id": "G9-PHYS-U5",
          "number": "5",
          "title": "Simple Machines",
          "startPage": 81,
          "endPage": 112,
          "sections": [
            {
              "id": "G9-PHYS-U5-S1",
              "title": "5.1 Simple Machines",
              "startPage": 82
            },
            {
              "id": "G9-PHYS-U5-S2",
              "title": "5.2 Mechanical Advantage",
              "startPage": 85
            },
            {
              "id": "G9-PHYS-U5-S3",
              "title": "5.3 Velocity Ratio",
              "startPage": 87
            },
            {
              "id": "G9-PHYS-U5-S4",
              "title": "5.4 Efficiency",
              "startPage": 89
            },
            {
              "id": "G9-PHYS-U5-S5",
              "title": "5.5 Applications of Simple Machines",
              "startPage": 92
            },
            {
              "id": "G9-PHYS-U5-S6",
              "title": "5.6 Review and application work",
              "startPage": 108
            }
          ]
        },
        {
          "id": "G9-PHYS-U6",
          "number": "6",
          "title": "Mechanical Oscillation and Sound Wave",
          "startPage": 113,
          "endPage": 138,
          "sections": [
            {
              "id": "G9-PHYS-U6-S1",
              "title": "6.1 Mechanical Oscillation",
              "startPage": 114
            },
            {
              "id": "G9-PHYS-U6-S2",
              "title": "6.2 Simple Harmonic Motion",
              "startPage": 116
            },
            {
              "id": "G9-PHYS-U6-S3",
              "title": "6.3 Periodic Motion",
              "startPage": 123
            },
            {
              "id": "G9-PHYS-U6-S4",
              "title": "6.4 Sound",
              "startPage": 125
            },
            {
              "id": "G9-PHYS-U6-S5",
              "title": "6.5 Characteristics of Sound",
              "startPage": 131
            },
            {
              "id": "G9-PHYS-U6-S6",
              "title": "6.6 Applications of Sound",
              "startPage": 132
            }
          ]
        },
        {
          "id": "G9-PHYS-U7",
          "number": "7",
          "title": "Temperature and Thermometry",
          "startPage": 139,
          "endPage": 170,
          "sections": [
            {
              "id": "G9-PHYS-U7-S1",
              "title": "7.1 Temperature",
              "startPage": 140
            },
            {
              "id": "G9-PHYS-U7-S2",
              "title": "7.2 Thermometry",
              "startPage": 142
            },
            {
              "id": "G9-PHYS-U7-S3",
              "title": "7.3 Temperature Scales",
              "startPage": 143
            },
            {
              "id": "G9-PHYS-U7-S4",
              "title": "7.4 Thermal Expansion",
              "startPage": 146
            },
            {
              "id": "G9-PHYS-U7-S5",
              "title": "7.5 Heat and Temperature",
              "startPage": 153
            },
            {
              "id": "G9-PHYS-U7-S6",
              "title": "7.6 Specific Heat",
              "startPage": 156
            },
            {
              "id": "G9-PHYS-U7-S7",
              "title": "7.7 Applications",
              "startPage": 161
            }
          ]
        }
      ]
    },
    "10": {
      "bookId": 8,
      "bookTitle": "G10-Physics-STB-2023-web.pdf",
      "pdfPages": 258,
      "sourceStatus": "verified-from-supplied-textbook-TOC",
      "note": "Section numbering and wording preserve the supplied Grade 10 Physics table of contents, including the source’s jump from 5.4 to 5.6.",
      "units": [
        {
          "id": "G10-PHYS-U1",
          "number": "1",
          "title": "Vector Quantities",
          "startPage": 1,
          "endPage": 20,
          "sections": [
            {
              "id": "G10-PHYS-U1-S1",
              "title": "1.1 Scalars and Vectors",
              "startPage": 2
            },
            {
              "id": "G10-PHYS-U1-S2",
              "title": "1.2 Vector representations",
              "startPage": 3
            },
            {
              "id": "G10-PHYS-U1-S3",
              "title": "1.3 Vector addition and subtraction",
              "startPage": 6
            },
            {
              "id": "G10-PHYS-U1-S4",
              "title": "1.4 Graphical method of vector addition",
              "startPage": 8
            },
            {
              "id": "G10-PHYS-U1-S5",
              "title": "1.5 Vector resolution",
              "startPage": 14
            }
          ]
        },
        {
          "id": "G10-PHYS-U2",
          "number": "2",
          "title": "Uniformly Accelerated Motion",
          "startPage": 21,
          "endPage": 58,
          "sections": [
            {
              "id": "G10-PHYS-U2-S1",
              "title": "2.1 Position and Displacement",
              "startPage": 22
            },
            {
              "id": "G10-PHYS-U2-S2",
              "title": "2.2 Average velocity and instantaneous velocity",
              "startPage": 25
            },
            {
              "id": "G10-PHYS-U2-S3",
              "title": "2.3 Acceleration",
              "startPage": 30
            },
            {
              "id": "G10-PHYS-U2-S4",
              "title": "2.4 Equations of motion with constant acceleration",
              "startPage": 36
            },
            {
              "id": "G10-PHYS-U2-S5",
              "title": "2.5 Graphical representation of uniformly accelerated motion",
              "startPage": 42
            },
            {
              "id": "G10-PHYS-U2-S6",
              "title": "2.6 Relative velocity in one dimension",
              "startPage": 50
            }
          ]
        },
        {
          "id": "G10-PHYS-U3",
          "number": "3",
          "title": "Elasticity and Static Equilibrium of Rigid Body",
          "startPage": 59,
          "endPage": 90,
          "sections": [
            {
              "id": "G10-PHYS-U3-S1",
              "title": "3.1 Elasticity and plasticity",
              "startPage": 60
            },
            {
              "id": "G10-PHYS-U3-S2",
              "title": "3.2 Density and specific gravity",
              "startPage": 63
            },
            {
              "id": "G10-PHYS-U3-S3",
              "title": "3.3 Stress and Strain",
              "startPage": 67
            },
            {
              "id": "G10-PHYS-U3-S4",
              "title": "3.4 The Young Modulus",
              "startPage": 72
            },
            {
              "id": "G10-PHYS-U3-S5",
              "title": "3.5 Static equilibrium",
              "startPage": 77
            },
            {
              "id": "G10-PHYS-U3-S6",
              "title": "3.5.1 First condition of equilibrium",
              "startPage": 78
            },
            {
              "id": "G10-PHYS-U3-S7",
              "title": "3.5.2 Second condition of equilibrium",
              "startPage": 79
            }
          ]
        },
        {
          "id": "G10-PHYS-U4",
          "number": "4",
          "title": "Static and Current Electricity",
          "startPage": 91,
          "endPage": 150,
          "sections": [
            {
              "id": "G10-PHYS-U4-S1",
              "title": "4.1 Charges in Nature",
              "startPage": 92
            },
            {
              "id": "G10-PHYS-U4-S2",
              "title": "4.2 Methods of Charging a Body",
              "startPage": 94
            },
            {
              "id": "G10-PHYS-U4-S3",
              "title": "4.3 The electroscope",
              "startPage": 97
            },
            {
              "id": "G10-PHYS-U4-S4",
              "title": "4.4 Electrical Discharge",
              "startPage": 99
            },
            {
              "id": "G10-PHYS-U4-S5",
              "title": "4.5 Coulomb’s law of electrostatics",
              "startPage": 102
            },
            {
              "id": "G10-PHYS-U4-S6",
              "title": "4.6 The electric field",
              "startPage": 104
            },
            {
              "id": "G10-PHYS-U4-S7",
              "title": "4.7 Electric circuits",
              "startPage": 107
            },
            {
              "id": "G10-PHYS-U4-S8",
              "title": "4.8 Current, Voltage, and Ohm’s Law",
              "startPage": 110
            },
            {
              "id": "G10-PHYS-U4-S9",
              "title": "4.9 Combination of resistors in a circuit",
              "startPage": 120
            },
            {
              "id": "G10-PHYS-U4-S10",
              "title": "4.10 Voltmeter and ammeter connection in a circuit",
              "startPage": 128
            },
            {
              "id": "G10-PHYS-U4-S11",
              "title": "4.11 Electrical safety in general and local context",
              "startPage": 132
            },
            {
              "id": "G10-PHYS-U4-S12",
              "title": "4.12 Electric projects",
              "startPage": 136
            }
          ]
        },
        {
          "id": "G10-PHYS-U5",
          "number": "5",
          "title": "Magnetism",
          "startPage": 151,
          "endPage": 176,
          "sections": [
            {
              "id": "G10-PHYS-U5-S1",
              "title": "5.1 Magnet",
              "startPage": 152
            },
            {
              "id": "G10-PHYS-U5-S2",
              "title": "5.2 Magnetic Field",
              "startPage": 155
            },
            {
              "id": "G10-PHYS-U5-S3",
              "title": "5.3 The Earth’s magnetic field and the compass",
              "startPage": 159
            },
            {
              "id": "G10-PHYS-U5-S4",
              "title": "5.4 Magnetic field of a current-carrying conductor",
              "startPage": 162
            },
            {
              "id": "G10-PHYS-U5-S5",
              "title": "5.6 Magnetic force on a current-carrying wire",
              "startPage": 167
            },
            {
              "id": "G10-PHYS-U5-S6",
              "title": "5.7 Magnetic force between two parallel current-carrying wires",
              "startPage": 170
            },
            {
              "id": "G10-PHYS-U5-S7",
              "title": "5.8 Applications of magnetism",
              "startPage": 171
            }
          ]
        },
        {
          "id": "G10-PHYS-U6",
          "number": "6",
          "title": "Electromagnetic Waves and Geometrical Optics",
          "startPage": 177,
          "endPage": 258,
          "sections": [
            {
              "id": "G10-PHYS-U6-S1",
              "title": "6.1 Electromagnetic (EM) waves",
              "startPage": 178
            },
            {
              "id": "G10-PHYS-U6-S2",
              "title": "6.2 EM Spectrum",
              "startPage": 180
            },
            {
              "id": "G10-PHYS-U6-S3",
              "title": "6.3 Light as a wave",
              "startPage": 186
            },
            {
              "id": "G10-PHYS-U6-S4",
              "title": "6.4 Laws of reflection & refraction",
              "startPage": 190
            },
            {
              "id": "G10-PHYS-U6-S5",
              "title": "6.5 Mirrors and lenses",
              "startPage": 203
            },
            {
              "id": "G10-PHYS-U6-S6",
              "title": "6.6 Human eye and optical instruments",
              "startPage": 228
            },
            {
              "id": "G10-PHYS-U6-S7",
              "title": "6.7 Primary colors of light and human vision",
              "startPage": 238
            },
            {
              "id": "G10-PHYS-U6-S8",
              "title": "6.8 Color addition of light",
              "startPage": 240
            },
            {
              "id": "G10-PHYS-U6-S9",
              "title": "6.9 Color subtraction of light using filters",
              "startPage": 241
            }
          ]
        }
      ]
    },
    "11": {
      "bookId": 11,
      "bookTitle": "G11-Physics-STB-2023-web (1).pdf",
      "pdfPages": 338,
      "sourceStatus": "verified-from-supplied-textbook-TOC",
      "note": "The supplied Grade 11 Physics source clearly supports these unit titles/ranges and the two captured Unit 1 sections; the remaining TOC section text was not reliably recoverable and is intentionally left unit-level.",
      "units": [
        {
          "id": "G11-PHYS-U1",
          "number": "1",
          "title": "Physics and Human Society",
          "startPage": 1,
          "endPage": 16,
          "sections": [
            {
              "id": "G11-PHYS-U1-S1",
              "title": "1.1 Importance of Physics to Society",
              "startPage": 2
            },
            {
              "id": "G11-PHYS-U1-S2",
              "title": "1.2 Physics Communities and Their Roles",
              "startPage": 4
            }
          ]
        },
        {
          "id": "G11-PHYS-U2",
          "number": "2",
          "title": "Vectors",
          "startPage": 17,
          "endPage": 46,
          "sections": [
            {
              "id": "G11-PHYS-U2-S1",
              "title": "2.1 Vectors and Types of Vectors",
              "startPage": 18
            },
            {
              "id": "G11-PHYS-U2-S2",
              "title": "2.2 Graphical Method of Addition of Vectors in Two Dimensions (2-D)",
              "startPage": 21
            },
            {
              "id": "G11-PHYS-U2-S3",
              "title": "2.3 Algebraic Method of addition of Vectors in Two Dimensions (2-D)",
              "startPage": 28
            },
            {
              "id": "G11-PHYS-U2-S4",
              "title": "2.4 Product of Vectors",
              "startPage": 39
            }
          ]
        },
        {
          "id": "G11-PHYS-U3",
          "number": "3",
          "title": "motion in one and two dimensions",
          "startPage": 47,
          "endPage": 94,
          "sections": [
            {
              "id": "G11-PHYS-U3-S1",
              "title": "3.1 Uniformly Accelerated Motion in 1D",
              "startPage": 48
            },
            {
              "id": "G11-PHYS-U3-S2",
              "title": "3.2 Equations of Uniformly Accelerated Motion in 1D",
              "startPage": 54
            },
            {
              "id": "G11-PHYS-U3-S3",
              "title": "3.3 Graphical Representation of Uniformly accelerated motion in 1 D",
              "startPage": 60
            },
            {
              "id": "G11-PHYS-U3-S4",
              "title": "3.4 Vertical Motion",
              "startPage": 70
            },
            {
              "id": "G11-PHYS-U3-S5",
              "title": "3.5 Uniform Circular Motion",
              "startPage": 76
            }
          ]
        },
        {
          "id": "G11-PHYS-U4",
          "number": "4",
          "title": "Dynamics",
          "startPage": 95,
          "endPage": 174,
          "sections": [
            {
              "id": "G11-PHYS-U4-S1",
              "title": "4.1 The Concept of Force and Newton's Laws of motion",
              "startPage": 98
            },
            {
              "id": "G11-PHYS-U4-S2",
              "title": "4.2 Frictional Force",
              "startPage": 112
            },
            {
              "id": "G11-PHYS-U4-S3",
              "title": "4.3 The First Condition of Equilibrium",
              "startPage": 128
            },
            {
              "id": "G11-PHYS-U4-S4",
              "title": "4.4 Work, Energy and Power",
              "startPage": 136
            },
            {
              "id": "G11-PHYS-U4-S5",
              "title": "4.5 Conservation of mechanical energy",
              "startPage": 144
            },
            {
              "id": "G11-PHYS-U4-S6",
              "title": "4.6 Impulse and Linear Momentum",
              "startPage": 148
            }
          ]
        },
        {
          "id": "G11-PHYS-U5",
          "number": "5",
          "title": "Heat Conduction and Calorimetry",
          "startPage": 175,
          "endPage": 216,
          "sections": [
            {
              "id": "G11-PHYS-U5-S1",
              "title": "5.1 The Concept of Heat",
              "startPage": 182
            },
            {
              "id": "G11-PHYS-U5-S2",
              "title": "5.2 Heat transfer mechanisms",
              "startPage": 185
            },
            {
              "id": "G11-PHYS-U5-S3",
              "title": "5.3 Heat Capacity and Specific Heat Capacity",
              "startPage": 189
            },
            {
              "id": "G11-PHYS-U5-S4",
              "title": "5.4 Thermal expansion",
              "startPage": 192
            },
            {
              "id": "G11-PHYS-U5-S5",
              "title": "5.5 Change of phase",
              "startPage": 202
            },
            {
              "id": "G11-PHYS-U5-S6",
              "title": "5.6 Calorimetry",
              "startPage": 209
            }
          ]
        },
        {
          "id": "G11-PHYS-U6",
          "number": "6",
          "title": "Electrostatics and Electric Circuit",
          "startPage": 217,
          "endPage": 286,
          "sections": [
            {
              "id": "G11-PHYS-U6-S1",
              "title": "6.1 Coulomb’s Law",
              "startPage": 224
            },
            {
              "id": "G11-PHYS-U6-S2",
              "title": "6.2 Electric Fields",
              "startPage": 231
            },
            {
              "id": "G11-PHYS-U6-S3",
              "title": "6.3 Electric Potential",
              "startPage": 238
            },
            {
              "id": "G11-PHYS-U6-S4",
              "title": "6.4 Electric Current, Resistance and ohm’s law",
              "startPage": 246
            },
            {
              "id": "G11-PHYS-U6-S5",
              "title": "6.6 Capacitors and Capacitance",
              "startPage": 276
            },
            {
              "id": "G11-PHYS-U6-S6",
              "title": "6.7 Electric Circuits in Our Surroundings",
              "startPage": 286
            }
          ]
        },
        {
          "id": "G11-PHYS-U7",
          "number": "7",
          "title": "Nuclear Physics",
          "startPage": 287,
          "endPage": 338,
          "sections": [
            {
              "id": "G11-PHYS-U7-S1",
              "title": "7.1 The nucleus",
              "startPage": 294
            },
            {
              "id": "G11-PHYS-U7-S2",
              "title": "7.1.1 Historical origins of the nucleus and its constituting particles",
              "startPage": 297
            },
            {
              "id": "G11-PHYS-U7-S3",
              "title": "7.1.2 What keeps the nucleus together?",
              "startPage": 300
            },
            {
              "id": "G11-PHYS-U7-S4",
              "title": "7.2 Radioactivity",
              "startPage": 305
            },
            {
              "id": "G11-PHYS-U7-S5",
              "title": "7.3 Use of nuclear radiation",
              "startPage": 318
            },
            {
              "id": "G11-PHYS-U7-S6",
              "title": "7.4 Nuclear Reaction and Energy Production",
              "startPage": 322
            },
            {
              "id": "G11-PHYS-U7-S7",
              "title": "7.4.1 Nuclear fusion reaction and its uses",
              "startPage": 325
            },
            {
              "id": "G11-PHYS-U7-S8",
              "title": "7.5 Safety Rules Against Hazards of Nuclear Radiation",
              "startPage": 329
            }
          ]
        }
      ]
    },
    "12": {
      "bookId": 14,
      "bookTitle": "G12-Physics-STB-2023-web.pdf",
      "pdfPages": 186,
      "sourceStatus": "verified-from-supplied-textbook-TOC",
      "note": "Two-dimensional-motion subsection labels were not reliably captured in the supplied source extraction, so their page anchors are retained without invented names.",
      "units": [
        {
          "id": "G12-PHYS-U1",
          "number": "1",
          "title": "Application of physics in other fields",
          "startPage": 1,
          "endPage": 23,
          "sections": [
            {
              "id": "G12-PHYS-U1-S1",
              "title": "1.1 Physics and other sciences",
              "startPage": 2
            },
            {
              "id": "G12-PHYS-U1-S2",
              "title": "1.2 Physics and engineering",
              "startPage": 9
            },
            {
              "id": "G12-PHYS-U1-S3",
              "title": "1.3 Medical physics",
              "startPage": 12
            },
            {
              "id": "G12-PHYS-U1-S4",
              "title": "1.4 Physics and defense technology",
              "startPage": 17
            },
            {
              "id": "G12-PHYS-U1-S5",
              "title": "1.5 Physics in communication",
              "startPage": 20
            }
          ]
        },
        {
          "id": "G12-PHYS-U2",
          "number": "2",
          "title": "Two-dimensional motion",
          "startPage": 24,
          "endPage": 68,
          "sections": [
            {
              "id": "G12-PHYS-U2-S1",
              "title": "2.1 Projectile motion",
              "startPage": 25
            },
            {
              "id": "G12-PHYS-U2-S2",
              "title": "2.2 Rotational Motion",
              "startPage": 39
            },
            {
              "id": "G12-PHYS-U2-S3",
              "title": "2.3 Rotational Dynamics",
              "startPage": 50
            },
            {
              "id": "G12-PHYS-U2-S4",
              "title": "2.4 Planetary motion and Kepler’s laws",
              "startPage": 54
            },
            {
              "id": "G12-PHYS-U2-S5",
              "title": "2.5 Newton’s law of universal Gravitation",
              "startPage": 59
            }
          ]
        },
        {
          "id": "G12-PHYS-U3",
          "number": "3",
          "title": "Fluid Mechanics",
          "startPage": 69,
          "endPage": 116,
          "sections": [
            {
              "id": "G12-PHYS-U3-S1",
              "title": "3.1 Fluid Statics",
              "startPage": 69
            },
            {
              "id": "G12-PHYS-U3-S2",
              "title": "3.2 Pressure in fluids at rest",
              "startPage": 82
            },
            {
              "id": "G12-PHYS-U3-S3",
              "title": "3.3 Archimedes’ principle",
              "startPage": 96
            },
            {
              "id": "G12-PHYS-U3-S4",
              "title": "3.4 Fluid flow",
              "startPage": 103
            },
            {
              "id": "G12-PHYS-U3-S5",
              "title": "3.5 Safety and high pressure",
              "startPage": 107
            }
          ]
        },
        {
          "id": "G12-PHYS-U4",
          "number": "4",
          "title": "Electromagnetism",
          "startPage": 117,
          "endPage": 141,
          "sections": [
            {
              "id": "G12-PHYS-U4-S1",
              "title": "4.1 Magnets and Magnetic field",
              "startPage": 118
            },
            {
              "id": "G12-PHYS-U4-S2",
              "title": "4.2 Magnetic field lines",
              "startPage": 120
            },
            {
              "id": "G12-PHYS-U4-S3",
              "title": "4.3 Current and Magnetism",
              "startPage": 122
            },
            {
              "id": "G12-PHYS-U4-S4",
              "title": "4.4 Electromagnetic Induction",
              "startPage": 126
            },
            {
              "id": "G12-PHYS-U4-S5",
              "title": "4.5 Faraday’s Law of electromagnetic Induction",
              "startPage": 129
            },
            {
              "id": "G12-PHYS-U4-S6",
              "title": "4.6 Transformers",
              "startPage": 131
            },
            {
              "id": "G12-PHYS-U4-S7",
              "title": "4.7 Application and safety",
              "startPage": 134
            }
          ]
        },
        {
          "id": "G12-PHYS-U5",
          "number": "5",
          "title": "Basics of electronics",
          "startPage": 142,
          "endPage": 186,
          "sections": [
            {
              "id": "G12-PHYS-U5-S1",
              "title": "5.1 Semiconductors",
              "startPage": 143
            },
            {
              "id": "G12-PHYS-U5-S2",
              "title": "5.2 Diodes and their Functions",
              "startPage": 147
            },
            {
              "id": "G12-PHYS-U5-S3",
              "title": "5.3 Rectification",
              "startPage": 150
            },
            {
              "id": "G12-PHYS-U5-S4",
              "title": "5.4 Transistors and their application",
              "startPage": 154
            },
            {
              "id": "G12-PHYS-U5-S5",
              "title": "5.5 Integrated Circuits",
              "startPage": 161
            },
            {
              "id": "G12-PHYS-U5-S6",
              "title": "5.6 Logic gates and logic circuits",
              "startPage": 163
            },
            {
              "id": "G12-PHYS-U5-S7",
              "title": "5.7 Application of electronics",
              "startPage": 170
            }
          ]
        }
      ]
    }
  },
  "Chemistry": {
    "9": {
      "bookTitle": "G9-Chemistry-STB-2023-web.pdf",
      "units": [
        {
          "id": "G9-CHM-U1",
          "number": "1",
          "title": "Chemistry and Its Importance",
          "startPage": 1,
          "endPage": 16,
          "sections": [
            {
              "id": "G9-CHM-U1-S1",
              "title": "1.1 Definition and Scope of Chemistry",
              "startPage": 2
            },
            {
              "id": "G9-CHM-U1-S2",
              "title": "1.2 Relationship between Chemistry and Other Natural Sciences",
              "startPage": 6
            },
            {
              "id": "G9-CHM-U1-S3",
              "title": "1.3 The Role Chemistry Plays in Production and in the Society",
              "startPage": 8
            },
            {
              "id": "G9-CHM-U1-S4",
              "title": "1.4 Some Common Chemical Industries in Ethiopia",
              "startPage": 12
            }
          ]
        },
        {
          "id": "G9-CHM-U2",
          "number": "2",
          "title": "Measurements and Units in Chemistry",
          "startPage": 17,
          "endPage": 50,
          "sections": [
            {
              "id": "G9-CHM-U2-S1",
              "title": "2.1 Measurements and Units in Chemistry",
              "startPage": 19
            }
          ]
        },
        {
          "id": "G9-CHM-U3",
          "number": "3",
          "title": "Structure of the Atom",
          "startPage": 50,
          "endPage": 108,
          "sections": [
            {
              "id": "G9-CHM-U3-S1",
              "title": "3.1 Historical Development of the Atomic Theories of Matter",
              "startPage": 51
            },
            {
              "id": "G9-CHM-U3-S2",
              "title": "3.2 Fundamental Laws of Chemical Reactions",
              "startPage": 56
            },
            {
              "id": "G9-CHM-U3-S3",
              "title": "3.3 Atomic Theory",
              "startPage": 64
            },
            {
              "id": "G9-CHM-U3-S4",
              "title": "3.4 Discoveries of Fundamental Subatomic Particles and the Atomic Nucleus",
              "startPage": 69
            },
            {
              "id": "G9-CHM-U3-S5",
              "title": "3.5 Composition of an Atom and the Isotopes",
              "startPage": 85
            }
          ]
        },
        {
          "id": "G9-CHM-U4",
          "number": "4",
          "title": "Periodic Classification of Elements",
          "startPage": 110,
          "endPage": 139,
          "sections": [
            {
              "id": "G9-CHM-U4-S2",
              "title": "4.2 Mendeleev's Classification of the Elements",
              "startPage": 113
            }
          ]
        },
        {
          "id": "G9-CHM-U5",
          "number": "5",
          "title": "Chemical Bonding",
          "startPage": 140,
          "endPage": 173,
          "sections": [
            {
              "id": "G9-CHM-U5-S1",
              "title": "5.1 Chemical Bonding",
              "startPage": 141
            },
            {
              "id": "G9-CHM-U5-S2",
              "title": "5.2 Ionic Bonding",
              "startPage": 143
            },
            {
              "id": "G9-CHM-U5-S3",
              "title": "5.3 Covalent Bonding",
              "startPage": 154
            },
            {
              "id": "G9-CHM-U5-S4",
              "title": "5.4 Metallic Bonding",
              "startPage": 167
            }
          ]
        }
      ],
      "bookId": 2,
      "pdfPages": 183,
      "sourceStatus": "source-backed-map-derived-from-supplied-analysis",
      "note": ""
    },
    "10": {
      "bookId": 6,
      "bookTitle": "G10-Chemistry-STB-2023-web.pdf",
      "pdfPages": 306,
      "sourceStatus": "verified-from-supplied-textbook-TOC",
      "note": "The supplied Grade 10 Chemistry TOC did not reliably expose the titles of Units 4–6; these are intentionally labeled structurally rather than guessed.",
      "units": [
        {
          "id": "G10-CHEM-U1",
          "number": "1",
          "title": "CHEMICAL REACTIONS AND STOICHIOMETRY",
          "startPage": 1,
          "endPage": 50,
          "sections": [
            {
              "id": "G10-CHEM-U1-S1",
              "title": "1.1 Introduction",
              "startPage": 2
            },
            {
              "id": "G10-CHEM-U1-S2",
              "title": "1.2 Chemical Equations",
              "startPage": 3
            },
            {
              "id": "G10-CHEM-U1-S3",
              "title": "1.3 Types of Chemical Reactions",
              "startPage": 11
            },
            {
              "id": "G10-CHEM-U1-S4",
              "title": "1.4 Oxidation and Reduction Reactions",
              "startPage": 20
            },
            {
              "id": "G10-CHEM-U1-S5",
              "title": "1.5 Molecular and Formula Masses, the Mole Concept and Chemical Formulas",
              "startPage": 28
            },
            {
              "id": "G10-CHEM-U1-S6",
              "title": "1.6 Stoichiometry",
              "startPage": 34
            }
          ]
        },
        {
          "id": "G10-CHEM-U2",
          "number": "2",
          "title": "SOLLUTIONS",
          "startPage": 51,
          "endPage": 108,
          "sections": [
            {
              "id": "G10-CHEM-U2-S1",
              "title": "2.1 Heterogeneous and Homogeneous Mixtures",
              "startPage": 53
            },
            {
              "id": "G10-CHEM-U2-S2",
              "title": "2.2 The Solution Process",
              "startPage": 59
            },
            {
              "id": "G10-CHEM-U2-S3",
              "title": "2.3 Solubility as an Equilibrium Process",
              "startPage": 73
            },
            {
              "id": "G10-CHEM-U2-S4",
              "title": "2.4 Ways of Expressing Concentration of Solution",
              "startPage": 81
            },
            {
              "id": "G10-CHEM-U2-S5",
              "title": "2.5 Preparation of Solutions",
              "startPage": 94
            },
            {
              "id": "G10-CHEM-U2-S6",
              "title": "2.6 Solution Stoichiometry",
              "startPage": 98
            },
            {
              "id": "G10-CHEM-U2-S7",
              "title": "2.7 Describing Reactions in Solution",
              "startPage": 101
            }
          ]
        },
        {
          "id": "G10-CHEM-U3",
          "number": "3",
          "title": "IMPORTANT INORGANIC COMPOUNDS",
          "startPage": 109,
          "endPage": 166,
          "sections": [
            {
              "id": "G10-CHEM-U3-S1",
              "title": "3.1 Introduction",
              "startPage": 110
            },
            {
              "id": "G10-CHEM-U3-S2",
              "title": "3.2 Oxides",
              "startPage": 111
            },
            {
              "id": "G10-CHEM-U3-S3",
              "title": "3.3 Acids",
              "startPage": 122
            },
            {
              "id": "G10-CHEM-U3-S4",
              "title": "3.4 Bases",
              "startPage": 140
            },
            {
              "id": "G10-CHEM-U3-S5",
              "title": "3.5 Salts",
              "startPage": 148
            }
          ]
        },
        {
          "id": "G10-CHEM-U4",
          "number": "4",
          "title": "Unit 4",
          "startPage": 167,
          "endPage": 198,
          "sections": [
            {
              "id": "G10-CHEM-U4-S1",
              "title": "4.1 Introduction",
              "startPage": 167
            },
            {
              "id": "G10-CHEM-U4-S2",
              "title": "4.2 Energy Changes in Electrochemistry",
              "startPage": 174
            },
            {
              "id": "G10-CHEM-U4-S3",
              "title": "4.3 Electrochemical Cells",
              "startPage": 182
            },
            {
              "id": "G10-CHEM-U4-S4",
              "title": "4.4 Electrolysis",
              "startPage": 187
            }
          ]
        },
        {
          "id": "G10-CHEM-U5",
          "number": "5",
          "title": "Unit 5",
          "startPage": 199,
          "endPage": 234,
          "sections": [
            {
              "id": "G10-CHEM-U5-S1",
              "title": "5.1 Introduction",
              "startPage": 199
            },
            {
              "id": "G10-CHEM-U5-S2",
              "title": "5.2 General Properties of Metals and Production of",
              "startPage": 203
            },
            {
              "id": "G10-CHEM-U5-S3",
              "title": "5.3 Production of Some Important Nonmetals",
              "startPage": 218
            }
          ]
        },
        {
          "id": "G10-CHEM-U6",
          "number": "6",
          "title": "Unit 6",
          "startPage": 235,
          "endPage": 306,
          "sections": [
            {
              "id": "G10-CHEM-U6-S1",
              "title": "6.1 Introduction",
              "startPage": 235
            },
            {
              "id": "G10-CHEM-U6-S2",
              "title": "6.2 Saturated Hydrocarbons: Alkanes (CnH2n+2)",
              "startPage": 240
            },
            {
              "id": "G10-CHEM-U6-S3",
              "title": "6.3 Unsaturated Hydrocarbons: Alkenes, Alkynes …",
              "startPage": 270
            },
            {
              "id": "G10-CHEM-U6-S4",
              "title": "6.4 Aromatic Hydrocarbons: Benzene",
              "startPage": 285
            },
            {
              "id": "G10-CHEM-U6-S5",
              "title": "6.5 Natural Sources of Hydrocarbons",
              "startPage": 290
            }
          ]
        }
      ]
    },
    "11": {
      "bookId": 10,
      "bookTitle": "G11-Chemistry-STB-2023-web.pdf",
      "pdfPages": 342,
      "sourceStatus": "verified-from-supplied-textbook-TOC",
      "note": "The supplied Grade 11 Chemistry extraction clearly supports these units and section anchors. Deeper TOC lines after 6.2.6 were not reliable enough to preserve without inventing text.",
      "units": [
        {
          "id": "G11-CHEM-U1",
          "number": "1",
          "title": "ATOMIC STRUCTURE AND PERIODIC TABLE",
          "startPage": 1,
          "endPage": 66,
          "sections": [
            {
              "id": "G11-CHEM-U1-S1",
              "title": "1.1 Introduction",
              "startPage": 2
            },
            {
              "id": "G11-CHEM-U1-S2",
              "title": "1.2 Dalton’s Atomic Theory and the Modern Atomic Theory",
              "startPage": 3
            },
            {
              "id": "G11-CHEM-U1-S3",
              "title": "1.3 Early Experiments to Characterize the Atom",
              "startPage": 6
            },
            {
              "id": "G11-CHEM-U1-S4",
              "title": "1.4 Make-up of the Nucleus",
              "startPage": 12
            },
            {
              "id": "G11-CHEM-U1-S5",
              "title": "1.5 Electromagnetic Radiation and Atomic Spectra",
              "startPage": 15
            },
            {
              "id": "G11-CHEM-U1-S6",
              "title": "1.6 The Quantum Mechanical Model of the Atom",
              "startPage": 34
            },
            {
              "id": "G11-CHEM-U1-S7",
              "title": "1.7 Electronic Configurations and Orbital Diagrams",
              "startPage": 41
            },
            {
              "id": "G11-CHEM-U1-S8",
              "title": "1.8 Electronic Configurations and the Periodic Table of the Elements",
              "startPage": 47
            }
          ]
        },
        {
          "id": "G11-CHEM-U2",
          "number": "2",
          "title": "CHEMICAL BONDING",
          "startPage": 67,
          "endPage": 144,
          "sections": [
            {
              "id": "G11-CHEM-U2-S1",
              "title": "2.1 Introduction",
              "startPage": 67
            },
            {
              "id": "G11-CHEM-U2-S2",
              "title": "2.2 Ionic Bonds",
              "startPage": 69
            },
            {
              "id": "G11-CHEM-U2-S3",
              "title": "2.3 Covalent Bonds and Molecular Geometry",
              "startPage": 83
            },
            {
              "id": "G11-CHEM-U2-S4",
              "title": "2.4 Metallic Bonding",
              "startPage": 111
            },
            {
              "id": "G11-CHEM-U2-S5",
              "title": "2.5 Chemical Bonding Theories",
              "startPage": 114
            },
            {
              "id": "G11-CHEM-U2-S6",
              "title": "2.6 Types of Crystal",
              "startPage": 135
            }
          ]
        },
        {
          "id": "G11-CHEM-U3",
          "number": "3",
          "title": "PHYSICAL STATES OF MATTER",
          "startPage": 145,
          "endPage": 192,
          "sections": [
            {
              "id": "G11-CHEM-U3-S1",
              "title": "3.1 Introduction",
              "startPage": 145
            },
            {
              "id": "G11-CHEM-U3-S2",
              "title": "3.2 Kinetic Theory and Properties of Matter",
              "startPage": 147
            },
            {
              "id": "G11-CHEM-U3-S3",
              "title": "3.3 The Gaseous State",
              "startPage": 150
            },
            {
              "id": "G11-CHEM-U3-S4",
              "title": "3.4 The Liquid State",
              "startPage": 173
            },
            {
              "id": "G11-CHEM-U3-S5",
              "title": "3.5 The Solid State",
              "startPage": 180
            }
          ]
        },
        {
          "id": "G11-CHEM-U4",
          "number": "4",
          "title": "CHEMICAL KINETICS",
          "startPage": 193,
          "endPage": 221,
          "sections": [
            {
              "id": "G11-CHEM-U4-S1",
              "title": "4.1 Introduction",
              "startPage": 193
            },
            {
              "id": "G11-CHEM-U4-S2",
              "title": "4.2 The Rate of a Reaction",
              "startPage": 193
            },
            {
              "id": "G11-CHEM-U4-S3",
              "title": "4.3 Factors Affecting the Rate of a Chemical Reaction",
              "startPage": 207
            }
          ]
        },
        {
          "id": "G11-CHEM-U5",
          "number": "5",
          "title": "CHEMICAL EQUILIBRIUM",
          "startPage": 222,
          "endPage": 263,
          "sections": [
            {
              "id": "G11-CHEM-U5-S1",
              "title": "5.1 Introduction",
              "startPage": 222
            },
            {
              "id": "G11-CHEM-U5-S2",
              "title": "5.2 Chemical Equilibrium",
              "startPage": 222
            },
            {
              "id": "G11-CHEM-U5-S3",
              "title": "5.2.1 Reversible and Irreversible Reactions",
              "startPage": 224
            },
            {
              "id": "G11-CHEM-U5-S4",
              "title": "5.2.2 Attainment and Characteristics of Chemical Equilibria",
              "startPage": 225
            },
            {
              "id": "G11-CHEM-U5-S5",
              "title": "5.2.3 Conditions for Attainment of Chemical Equilibria",
              "startPage": 226
            },
            {
              "id": "G11-CHEM-U5-S6",
              "title": "5.2.4 Equilibrium Expression and Equilibrium Constant",
              "startPage": 228
            },
            {
              "id": "G11-CHEM-U5-S7",
              "title": "5.2.5 Applications of Equilibrium Constant",
              "startPage": 239
            },
            {
              "id": "G11-CHEM-U5-S8",
              "title": "5.2.6 Changing Equilibrium Conditions: Le-Chatelier’s Principle",
              "startPage": 245
            },
            {
              "id": "G11-CHEM-U5-S9",
              "title": "5.2.7 Equilibrium and Industry",
              "startPage": 253
            }
          ]
        },
        {
          "id": "G11-CHEM-U6",
          "number": "6",
          "title": "SOME IMPORTANT OXYGEN-CONTAINING ORGANIC COMPOUNDS",
          "startPage": 264,
          "endPage": 342,
          "sections": [
            {
              "id": "G11-CHEM-U6-S1",
              "title": "6.1 Introduction",
              "startPage": 264
            },
            {
              "id": "G11-CHEM-U6-S2",
              "title": "6.2 Alcohols and Ethers",
              "startPage": 265
            },
            {
              "id": "G11-CHEM-U6-S3",
              "title": "6.2.1 Classification of Alcohols",
              "startPage": 267
            },
            {
              "id": "G11-CHEM-U6-S4",
              "title": "6.2.2 Nomenclature of Alcohols",
              "startPage": 269
            },
            {
              "id": "G11-CHEM-U6-S5",
              "title": "6.2.3 Physical Properties of Alcohols",
              "startPage": 270
            },
            {
              "id": "G11-CHEM-U6-S6",
              "title": "6.2.4 Preparation of Alcohols",
              "startPage": 272
            },
            {
              "id": "G11-CHEM-U6-S7",
              "title": "6.2.5 Chemical Properties of Alcohols",
              "startPage": 277
            },
            {
              "id": "G11-CHEM-U6-S8",
              "title": "6.2.6 Structure and Nomenclature of Ethers",
              "startPage": 283
            }
          ]
        }
      ]
    },
    "12": {
      "bookId": 13,
      "bookTitle": "G12-Chemistry-STB-2023-web.pdf",
      "pdfPages": 298,
      "sourceStatus": "verified-from-supplied-textbook-TOC",
      "note": "Terminology and source typos are preserved where they were present in the supplied extraction. Section 5.3.2 is omitted because its page anchor was unclear in the source.",
      "units": [
        {
          "id": "G12-CHEM-U1",
          "number": "1",
          "title": "ACID-BASE EQUILIBRIA",
          "startPage": 1,
          "endPage": 56,
          "sections": [
            {
              "id": "G12-CHEM-U1-S1",
              "title": "1.1 Acid-Base Concepts",
              "startPage": 3
            },
            {
              "id": "G12-CHEM-U1-S2",
              "title": "1.1.1 Arrhenius Concept of Acids and Bases",
              "startPage": 3
            },
            {
              "id": "G12-CHEM-U1-S3",
              "title": "1.1.2 Brønsted-Lowry Concept of Acids and Bases",
              "startPage": 5
            },
            {
              "id": "G12-CHEM-U1-S4",
              "title": "1.1.3 Lewis Concept of Acids and Bases",
              "startPage": 11
            },
            {
              "id": "G12-CHEM-U1-S5",
              "title": "1.2 Ionic Equlibria of Week Acids and Bases",
              "startPage": 14
            },
            {
              "id": "G12-CHEM-U1-S6",
              "title": "1.2.1 Ionization of Water",
              "startPage": 15
            },
            {
              "id": "G12-CHEM-U1-S7",
              "title": "1.2.2 Measures of the Strength of acids and Bases",
              "startPage": 22
            },
            {
              "id": "G12-CHEM-U1-S8",
              "title": "1.3 Common Ion Effect and Buffer Solution",
              "startPage": 31
            },
            {
              "id": "G12-CHEM-U1-S9",
              "title": "1.3.1 The Common Ion Effect",
              "startPage": 32
            },
            {
              "id": "G12-CHEM-U1-S10",
              "title": "1.3.2 Buffer Solutions",
              "startPage": 34
            },
            {
              "id": "G12-CHEM-U1-S11",
              "title": "1.4 Hydrolysis of Salts",
              "startPage": 39
            },
            {
              "id": "G12-CHEM-U1-S12",
              "title": "1.4.1 Hydrolysis of Salts of Strong Acids and Strong Bases",
              "startPage": 39
            },
            {
              "id": "G12-CHEM-U1-S13",
              "title": "1.4.2 Hydrolysis of Salts of Weak Acids and Strong Bases",
              "startPage": 40
            },
            {
              "id": "G12-CHEM-U1-S14",
              "title": "1.4.3 Hydrolysis of Salts of Strong Acids and Weak Bases",
              "startPage": 40
            },
            {
              "id": "G12-CHEM-U1-S15",
              "title": "1.4.4 Hydrolysis of Salts of Weak Acids and Week Bases",
              "startPage": 41
            },
            {
              "id": "G12-CHEM-U1-S16",
              "title": "1.5 Acid–Base Indicators and Titrations",
              "startPage": 42
            },
            {
              "id": "G12-CHEM-U1-S17",
              "title": "1.5.1 Acid–Base Indicators",
              "startPage": 42
            },
            {
              "id": "G12-CHEM-U1-S18",
              "title": "1.5.2 Equivalents of Acids and Bases",
              "startPage": 44
            },
            {
              "id": "G12-CHEM-U1-S19",
              "title": "1.5.3 Acid–Base Titrations",
              "startPage": 45
            }
          ]
        },
        {
          "id": "G12-CHEM-U2",
          "number": "2",
          "title": "ELECTROCHEMISTRY",
          "startPage": 57,
          "endPage": 135,
          "sections": [
            {
              "id": "G12-CHEM-U2-S1",
              "title": "2.1 Oxidation-Reduction Reactions",
              "startPage": 57
            },
            {
              "id": "G12-CHEM-U2-S2",
              "title": "2.1.1 Oxidation",
              "startPage": 57
            },
            {
              "id": "G12-CHEM-U2-S3",
              "title": "2.1.2 Reduction",
              "startPage": 58
            },
            {
              "id": "G12-CHEM-U2-S4",
              "title": "2.1.3 Balancing Oxidation-Reduction (Redox) Reactions",
              "startPage": 59
            },
            {
              "id": "G12-CHEM-U2-S5",
              "title": "2.2 Electrolysis of Aqueous Solutions",
              "startPage": 66
            },
            {
              "id": "G12-CHEM-U2-S6",
              "title": "2.2.1 Electrolytic Cells",
              "startPage": 69
            },
            {
              "id": "G12-CHEM-U2-S7",
              "title": "2.2.2 Preferential Discharge",
              "startPage": 70
            },
            {
              "id": "G12-CHEM-U2-S8",
              "title": "2.2.3 Electrolysis of Some Selected Aqueous Solutions",
              "startPage": 74
            },
            {
              "id": "G12-CHEM-U2-S9",
              "title": "2.3 Quantitative Aspects of Electrolysis",
              "startPage": 80
            },
            {
              "id": "G12-CHEM-U2-S10",
              "title": "2.3.1 Faraday’s First Law of Electrolysis",
              "startPage": 81
            },
            {
              "id": "G12-CHEM-U2-S11",
              "title": "2.3.2 Faraday’s Second Law of Electrolysis",
              "startPage": 84
            },
            {
              "id": "G12-CHEM-U2-S12",
              "title": "2.4 Industrial Application of Electrolysis",
              "startPage": 86
            },
            {
              "id": "G12-CHEM-U2-S13",
              "title": "2.5 Volatic Cells",
              "startPage": 92
            }
          ]
        },
        {
          "id": "G12-CHEM-U3",
          "number": "3",
          "title": "INDUSTRIAL CHEMISTRY",
          "startPage": 136,
          "endPage": 213,
          "sections": [
            {
              "id": "G12-CHEM-U3-S1",
              "title": "3.1 Introduction",
              "startPage": 136
            },
            {
              "id": "G12-CHEM-U3-S2",
              "title": "3.2 Natural Resources and Industry",
              "startPage": 138
            },
            {
              "id": "G12-CHEM-U3-S3",
              "title": "3.2.1 Natural Resources (Raw Materials)",
              "startPage": 139
            },
            {
              "id": "G12-CHEM-U3-S4",
              "title": "3.2.2 Industry",
              "startPage": 140
            },
            {
              "id": "G12-CHEM-U3-S5",
              "title": "3.3 Manufacturing of Valuable Products/ Chemicals",
              "startPage": 142
            },
            {
              "id": "G12-CHEM-U3-S6",
              "title": "3.3.1 Ammonia (NH3)",
              "startPage": 143
            },
            {
              "id": "G12-CHEM-U3-S7",
              "title": "3.3.2 Nitric Acid",
              "startPage": 152
            },
            {
              "id": "G12-CHEM-U3-S8",
              "title": "3.3.3 Nitrogen-Based Fertilizers",
              "startPage": 158
            },
            {
              "id": "G12-CHEM-U3-S9",
              "title": "3.3.4 Sulphuric Acid",
              "startPage": 162
            },
            {
              "id": "G12-CHEM-U3-S10",
              "title": "3.3.5 Some Common Pesticides and Herbicides",
              "startPage": 165
            },
            {
              "id": "G12-CHEM-U3-S11",
              "title": "3.3.6 Sodium Carbonate",
              "startPage": 170
            },
            {
              "id": "G12-CHEM-U3-S12",
              "title": "3.3.7 Sodium Hydroxide (NaOH)",
              "startPage": 172
            },
            {
              "id": "G12-CHEM-U3-S13",
              "title": "3.4 Some Manufacturing Industries in Ethiopia",
              "startPage": 174
            },
            {
              "id": "G12-CHEM-U3-S14",
              "title": "3.4.1 Glass Manufacturing",
              "startPage": 175
            },
            {
              "id": "G12-CHEM-U3-S15",
              "title": "3.4.2 Manufacturing of Ceramics",
              "startPage": 178
            },
            {
              "id": "G12-CHEM-U3-S16",
              "title": "3.4.3 Cement",
              "startPage": 180
            },
            {
              "id": "G12-CHEM-U3-S17",
              "title": "3.4.4 Sugar Manufacturing",
              "startPage": 183
            },
            {
              "id": "G12-CHEM-U3-S18",
              "title": "3.4.5 Paper and Pulp",
              "startPage": 185
            },
            {
              "id": "G12-CHEM-U3-S19",
              "title": "3.4.6 Tannery",
              "startPage": 187
            },
            {
              "id": "G12-CHEM-U3-S20",
              "title": "3.4.7 Food Processing and Preservation",
              "startPage": 189
            },
            {
              "id": "G12-CHEM-U3-S21",
              "title": "3.4.8 Manufacturing of Ethanol",
              "startPage": 191
            },
            {
              "id": "G12-CHEM-U3-S22",
              "title": "3.4.9 Soap and Detergent",
              "startPage": 198
            }
          ]
        },
        {
          "id": "G12-CHEM-U4",
          "number": "4",
          "title": "POLYMERS",
          "startPage": 214,
          "endPage": 240,
          "sections": [
            {
              "id": "G12-CHEM-U4-S1",
              "title": "4.1 Introduction to Polymers",
              "startPage": 214
            },
            {
              "id": "G12-CHEM-U4-S2",
              "title": "4.2 Polymerization Reactions",
              "startPage": 215
            },
            {
              "id": "G12-CHEM-U4-S3",
              "title": "4.3 Classification of Polymers",
              "startPage": 224
            }
          ]
        },
        {
          "id": "G12-CHEM-U5",
          "number": "5",
          "title": "INTRODUCTION TO ENVIRONMENTAL CHEMISTRY",
          "startPage": 241,
          "endPage": 298,
          "sections": [
            {
              "id": "G12-CHEM-U5-S1",
              "title": "5.1 Introduction",
              "startPage": 241
            },
            {
              "id": "G12-CHEM-U5-S2",
              "title": "5.1.1 Components of the Environment",
              "startPage": 242
            },
            {
              "id": "G12-CHEM-U5-S3",
              "title": "5.1.2 Natural Cycles in the Environment",
              "startPage": 247
            },
            {
              "id": "G12-CHEM-U5-S4",
              "title": "5.1.3 Concepts Related to Environmental Chemistry",
              "startPage": 253
            },
            {
              "id": "G12-CHEM-U5-S5",
              "title": "5.2 Environmental Pollution",
              "startPage": 255
            },
            {
              "id": "G12-CHEM-U5-S6",
              "title": "5.2.1 Air Pollution",
              "startPage": 256
            },
            {
              "id": "G12-CHEM-U5-S7",
              "title": "5.2.2 Water Pollution",
              "startPage": 260
            },
            {
              "id": "G12-CHEM-U5-S8",
              "title": "5.2.3 Land Pollution",
              "startPage": 262
            },
            {
              "id": "G12-CHEM-U5-S9",
              "title": "5.3 Global Warming and Climate Change",
              "startPage": 265
            },
            {
              "id": "G12-CHEM-U5-S10",
              "title": "5.3.1 Global Warming and Climate Change",
              "startPage": 265
            },
            {
              "id": "G12-CHEM-U5-S11",
              "title": "5.4 Green Chemistry and Cleaner Production",
              "startPage": 269
            },
            {
              "id": "G12-CHEM-U5-S12",
              "title": "5.4.1 Principle of Green Chemistry",
              "startPage": 271
            },
            {
              "id": "G12-CHEM-U5-S13",
              "title": "5.4.2 Cleaner Production in Chemistry",
              "startPage": 277
            }
          ]
        }
      ]
    }
  },
  "Biology": {
    "9": {
      "bookTitle": "Biology Grade 9 Students TextBook  Final Revised.pdf",
      "units": [
        {
          "id": "G9-BIO-U1",
          "number": "1",
          "title": "Introduction to Biology",
          "startPage": 1,
          "endPage": 18,
          "sections": [
            {
              "id": "G9-BIO-U1-S1",
              "title": "1.1 Definition of Biology",
              "startPage": 2
            },
            {
              "id": "G9-BIO-U1-S2",
              "title": "1.2 Why do we study Biology?",
              "startPage": 3
            },
            {
              "id": "G9-BIO-U1-S3",
              "title": "1.3 The scientific method",
              "startPage": 5
            },
            {
              "id": "G9-BIO-U1-S4",
              "title": "1.4 Tools of a Biologist",
              "startPage": 8
            },
            {
              "id": "G9-BIO-U1-S4A",
              "title": "1.4.1 Laboratory tools",
              "startPage": 8
            },
            {
              "id": "G9-BIO-U1-S4B",
              "title": "1.4.2 Field tools",
              "startPage": 10
            },
            {
              "id": "G9-BIO-U1-S5",
              "title": "1.5 Handling and using of light Microscope",
              "startPage": 12
            },
            {
              "id": "G9-BIO-U1-S5A",
              "title": "1.5.1 Parts and function of light microscope",
              "startPage": 12
            },
            {
              "id": "G9-BIO-U1-S5B",
              "title": "1.5.2 Handling and using microscope",
              "startPage": 14
            },
            {
              "id": "G9-BIO-U1-S6",
              "title": "1.6 General Laboratory Safety Rules",
              "startPage": 16
            }
          ]
        },
        {
          "id": "G9-BIO-U2",
          "number": "2",
          "title": "Characteristics and Classification of Organisms",
          "startPage": 19,
          "endPage": 43,
          "sections": [
            {
              "id": "G9-BIO-U2-S1",
              "title": "2.1 Principles of classification",
              "startPage": 21
            },
            {
              "id": "G9-BIO-U2-S2",
              "title": "2.2.2 Taxonomic hierarchies in biological classification",
              "startPage": 21
            },
            {
              "id": "G9-BIO-U2-S7",
              "title": "2.7 Renowned Taxonomists in Ethiopia",
              "startPage": 39
            }
          ]
        },
        {
          "id": "G9-BIO-U3",
          "number": "3",
          "title": "Cells",
          "startPage": 44,
          "endPage": 73,
          "sections": [
            {
              "id": "G9-BIO-U3-S1",
              "title": "3.1 What is a cell?",
              "startPage": 44
            },
            {
              "id": "G9-BIO-U3-S2",
              "title": "3.2 Cell theory",
              "startPage": 45
            },
            {
              "id": "G9-BIO-U3-S3",
              "title": "3.3 Cell structure and function",
              "startPage": 46
            },
            {
              "id": "G9-BIO-U3-S4",
              "title": "3.4 Types of cells",
              "startPage": 53
            },
            {
              "id": "G9-BIO-U3-S5",
              "title": "3.5 Animal and plant cells",
              "startPage": 54
            },
            {
              "id": "G9-BIO-U3-S6",
              "title": "3.6 Observing cells under a microscope",
              "startPage": 56
            },
            {
              "id": "G9-BIO-U3-S7",
              "title": "3.7 The cell and its environment",
              "startPage": 59
            },
            {
              "id": "G9-BIO-U3-S8",
              "title": "3.7.1 Passive transport",
              "startPage": 59
            },
            {
              "id": "G9-BIO-U3-S9",
              "title": "3.7.2 Active transport",
              "startPage": 68
            },
            {
              "id": "G9-BIO-U3-S10",
              "title": "3.8 Levels of Biological Organization",
              "startPage": 68
            }
          ]
        },
        {
          "id": "G9-BIO-U4",
          "number": "4",
          "title": "Reproduction",
          "startPage": 74,
          "endPage": 102,
          "sections": [
            {
              "id": "G9-BIO-U4-S1",
              "title": "4.1 Introduction to reproduction",
              "startPage": 75
            },
            {
              "id": "G9-BIO-U4-S2",
              "title": "4.2 Asexual reproduction",
              "startPage": 76
            },
            {
              "id": "G9-BIO-U4-S3",
              "title": "4.3 Types of asexual reproduction",
              "startPage": 76
            },
            {
              "id": "G9-BIO-U4-S4",
              "title": "4.3.1 Fission",
              "startPage": 76
            },
            {
              "id": "G9-BIO-U4-S5",
              "title": "4.3.2 Fragmentation",
              "startPage": 76
            },
            {
              "id": "G9-BIO-U4-S6",
              "title": "4.3.3 Budding",
              "startPage": 76
            },
            {
              "id": "G9-BIO-U4-S7",
              "title": "4.3.4 Vegetative propagation",
              "startPage": 76
            },
            {
              "id": "G9-BIO-U4-S8",
              "title": "4.4 Sexual reproduction in Humans",
              "startPage": 77
            },
            {
              "id": "G9-BIO-U4-S9",
              "title": "4.5 Primary and secondary sexual characteristics",
              "startPage": 78
            },
            {
              "id": "G9-BIO-U4-S10",
              "title": "4.6 Male reproductive structures",
              "startPage": 81
            },
            {
              "id": "G9-BIO-U4-S11",
              "title": "4.7 Female reproductive structures",
              "startPage": 81
            },
            {
              "id": "G9-BIO-U4-S12",
              "title": "4.8 The Menstrual cycle",
              "startPage": 84
            },
            {
              "id": "G9-BIO-U4-S13",
              "title": "4.9 Fertilization and pregnancy",
              "startPage": 86
            },
            {
              "id": "G9-BIO-U4-S14",
              "title": "4.10 Methods of birth control",
              "startPage": 88
            },
            {
              "id": "G9-BIO-U4-S15",
              "title": "4.11 Sexually transmitted infections (STIs): Transmission and prevention",
              "startPage": 90
            }
          ]
        },
        {
          "id": "G9-BIO-U5",
          "number": "5",
          "title": "Human Health, Nutrition and Diseases",
          "startPage": 103,
          "endPage": 136,
          "sections": [
            {
              "id": "G9-BIO-U5-S1",
              "title": "5.1 What is food?",
              "startPage": 105
            },
            {
              "id": "G9-BIO-U5-S2",
              "title": "5.2 Nutrition",
              "startPage": 106
            },
            {
              "id": "G9-BIO-U5-S3",
              "title": "5.3 Nutrients",
              "startPage": 106
            },
            {
              "id": "G9-BIO-U5-S4",
              "title": "5.4 Balanced diet",
              "startPage": 110
            },
            {
              "id": "G9-BIO-U5-S5",
              "title": "5.5 Deficiency diseases",
              "startPage": 112
            },
            {
              "id": "G9-BIO-U5-S6",
              "title": "5.6 Malnutrition",
              "startPage": 115
            },
            {
              "id": "G9-BIO-U5-S7",
              "title": "5.7 Substance abuse",
              "startPage": 117
            },
            {
              "id": "G9-BIO-U5-S8",
              "title": "5.8 Types of diseases",
              "startPage": 127
            },
            {
              "id": "G9-BIO-U5-S9",
              "title": "5.8.1 Infectious diseases",
              "startPage": 127
            },
            {
              "id": "G9-BIO-U5-S10",
              "title": "5.8.2 Non-infectious diseases",
              "startPage": 136
            },
            {
              "id": "G9-BIO-U5-S11",
              "title": "5.9 Renowned Nutritionists in Ethiopia",
              "startPage": 136
            }
          ]
        },
        {
          "id": "G9-BIO-U6",
          "number": "6",
          "title": "Ecology",
          "startPage": 137,
          "endPage": 160,
          "endPageLabel": "160+",
          "sections": [
            {
              "id": "G9-BIO-U6-S1",
              "title": "6.1 Ecology",
              "startPage": 139
            },
            {
              "id": "G9-BIO-U6-S2",
              "title": "6.1.1 Definitions of common ecological terms",
              "startPage": 139
            },
            {
              "id": "G9-BIO-U6-S3",
              "title": "6.1.2 Biotic and abiotic components",
              "startPage": 140
            },
            {
              "id": "G9-BIO-U6-S4",
              "title": "6.1.3 Ecological levels",
              "startPage": 143
            },
            {
              "id": "G9-BIO-U6-S5",
              "title": "6.1.4 Ecosystems",
              "startPage": 144
            },
            {
              "id": "G9-BIO-U6-S6",
              "title": "6.1.5 Biomes",
              "startPage": 145
            },
            {
              "id": "G9-BIO-U6-S7",
              "title": "6.1.6 Ecological succession",
              "startPage": 155
            },
            {
              "id": "G9-BIO-U6-S8",
              "title": "6.2 Ecological relationships",
              "startPage": 157
            }
          ]
        }
      ],
      "bookId": 1,
      "pdfPages": 165,
      "sourceStatus": "source-backed-map-derived-from-supplied-analysis",
      "note": ""
    },
    "10": {
      "bookTitle": "G10-Biology-STB-2023-web.pdf",
      "units": [
        {
          "id": "G10-BIO-U1",
          "number": "1",
          "title": "Sub-fields of Biology",
          "startPage": 1,
          "endPage": 22,
          "sections": [
            {
              "id": "G10-BIO-U1-S1",
              "title": "1.1 Sub-fields of biology",
              "startPage": 1
            },
            {
              "id": "G10-BIO-U1-S2",
              "title": "1.2 Pure and applied fields of biology",
              "startPage": 4
            },
            {
              "id": "G10-BIO-U1-S3",
              "title": "1.3 Major discoveries in Biology",
              "startPage": 5
            },
            {
              "id": "G10-BIO-U1-S4",
              "title": "1.4 The contributions of biological discoveries to society and the environment (e.g. microscope, penicillin, inheritance, etc.)",
              "startPage": 8
            },
            {
              "id": "G10-BIO-U1-S5",
              "title": "1.5 Major discoveries by Ethiopian Biologists (e.g. Aklilu Lemma, Gabissa Ejeta)",
              "startPage": 10
            }
          ]
        },
        {
          "id": "G10-BIO-U2",
          "number": "2",
          "title": "Plants",
          "startPage": 23,
          "endPage": 60,
          "sections": [
            {
              "id": "G10-BIO-U2-S231",
              "title": "2.3.1 The internal structure of a leaf",
              "startPage": 22
            },
            {
              "id": "G10-BIO-U2-S262",
              "title": "2.6.2 Germination of seed",
              "startPage": 32
            }
          ]
        },
        {
          "id": "G10-BIO-U4",
          "number": "4",
          "title": "Cell Reproduction",
          "startPage": 70,
          "endPage": 93,
          "sections": [
            {
              "id": "G10-BIO-U4-S1",
              "title": "4.1 Cell cycle",
              "startPage": 70
            },
            {
              "id": "G10-BIO-U4-S2",
              "title": "4.2 Cell division",
              "startPage": 83
            },
            {
              "id": "G10-BIO-U4-S3",
              "title": "4.2.1 Mitosis",
              "startPage": 83
            },
            {
              "id": "G10-BIO-U4-S4",
              "title": "4.2.2 Meiosis",
              "startPage": 91
            },
            {
              "id": "G10-BIO-U4-S5",
              "title": "4.3 Renowned Geneticist in Ethiopia",
              "startPage": 93
            }
          ]
        },
        {
          "id": "G10-BIO-U5",
          "number": "5",
          "title": "Human Biology",
          "startPage": 94,
          "endPage": 150,
          "sections": [
            {
              "id": "G10-BIO-U5-S1",
              "title": "5.1 Digestive system",
              "startPage": 94
            },
            {
              "id": "G10-BIO-U5-S2",
              "title": "5.2 Circulatory and Lymphatic systems",
              "startPage": 94
            },
            {
              "id": "G10-BIO-U5-S21",
              "title": "5.2.1 Blood donation",
              "startPage": 94
            },
            {
              "id": "G10-BIO-U5-S22",
              "title": "5.2.2 Diseases of the circulatory and lymphatic systems",
              "startPage": 94
            },
            {
              "id": "G10-BIO-U5-S3",
              "title": "5.3 Breathing system",
              "startPage": 94
            },
            {
              "id": "G10-BIO-U5-S4",
              "title": "5.4 Excretory system",
              "startPage": 94
            },
            {
              "id": "G10-BIO-U5-S5",
              "title": "5.5 The immune system",
              "startPage": 94
            },
            {
              "id": "G10-BIO-U5-S6",
              "title": "5.6 Renowned Physicians in Ethiopia",
              "startPage": 94
            }
          ]
        }
      ],
      "bookId": 5,
      "pdfPages": 182,
      "sourceStatus": "source-backed-map-derived-from-supplied-analysis",
      "note": ""
    },
    "11": {
      "bookId": 9,
      "bookTitle": "G11-Biology-STB-2023-web.pdf",
      "pdfPages": 294,
      "sourceStatus": "verified-from-supplied-textbook-TOC",
      "note": "Only the section headings/pages reliably recoverable from the supplied Grade 11 Biology source are mapped. Unit 4 and Unit 5 remain unit-level where the source did not support safe reconstruction.",
      "units": [
        {
          "id": "G11-BIOL-U1",
          "number": "1",
          "title": "Biology and Technology",
          "startPage": 7,
          "endPage": 25,
          "sections": [
            {
              "id": "G11-BIOL-U1-S1",
              "title": "1.1 Learning from nature",
              "startPage": 8
            },
            {
              "id": "G11-BIOL-U1-S2",
              "title": "1.2 Biology and technology",
              "startPage": 12
            },
            {
              "id": "G11-BIOL-U1-S3",
              "title": "1.2.1 The benefits of biology to technology",
              "startPage": 12
            },
            {
              "id": "G11-BIOL-U1-S4",
              "title": "1.2.2 Uses of technology in biology",
              "startPage": 14
            },
            {
              "id": "G11-BIOL-U1-S5",
              "title": "1.3 Impacts of biology and technology on society and the natural world",
              "startPage": 17
            },
            {
              "id": "G11-BIOL-U1-S6",
              "title": "1.3.1 Impacts of biology on the society and the natural world",
              "startPage": 18
            },
            {
              "id": "G11-BIOL-U1-S7",
              "title": "1.3.2 Impacts of technology on the society and the natural world",
              "startPage": 18
            },
            {
              "id": "G11-BIOL-U1-S8",
              "title": "1.4 Ethical issues in biology",
              "startPage": 19
            },
            {
              "id": "G11-BIOL-U1-S9",
              "title": "1.4.1 Ethical treatment of plants and animals during biological studies",
              "startPage": 20
            }
          ]
        },
        {
          "id": "G11-BIOL-U2",
          "number": "2",
          "title": "Animals",
          "startPage": 26,
          "endPage": 78,
          "sections": [
            {
              "id": "G11-BIOL-U2-S1",
              "title": "2.1 Characteristics of animals",
              "startPage": 27
            },
            {
              "id": "G11-BIOL-U2-S2",
              "title": "2.2 Invertebrates and Vertebrates",
              "startPage": 29
            },
            {
              "id": "G11-BIOL-U2-S3",
              "title": "2.2.1 Invertebrate Animals",
              "startPage": 30
            },
            {
              "id": "G11-BIOL-U2-S4",
              "title": "2.2.2 Vertebrate Animals",
              "startPage": 30
            },
            {
              "id": "G11-BIOL-U2-S5",
              "title": "2.3 Reproduction in Animals",
              "startPage": 31
            },
            {
              "id": "G11-BIOL-U2-S6",
              "title": "2.3.1 Asexual reproduction in animals",
              "startPage": 32
            },
            {
              "id": "G11-BIOL-U2-S7",
              "title": "2.3.2 Sexual reproduction in animals",
              "startPage": 32
            },
            {
              "id": "G11-BIOL-U2-S8",
              "title": "2.3.3 Reproduction in insects (complete and incomplete metamorphosis)",
              "startPage": 34
            },
            {
              "id": "G11-BIOL-U2-S9",
              "title": "2.3.4 Reproduction in Frog",
              "startPage": 36
            },
            {
              "id": "G11-BIOL-U2-S10",
              "title": "2.3.5 Reproduction in Crocodiles",
              "startPage": 38
            },
            {
              "id": "G11-BIOL-U2-S11",
              "title": "2.3.6 Reproduction in Birds",
              "startPage": 40
            },
            {
              "id": "G11-BIOL-U2-S12",
              "title": "2.3.7 Reproduction in rat",
              "startPage": 45
            },
            {
              "id": "G11-BIOL-U2-S13",
              "title": "2.4 The economic importance of animals (insects)",
              "startPage": 48
            },
            {
              "id": "G11-BIOL-U2-S14",
              "title": "2.4.1 Beneficial aspects of insects",
              "startPage": 49
            },
            {
              "id": "G11-BIOL-U2-S15",
              "title": "2.4.2 Harmful aspects of insects",
              "startPage": 52
            },
            {
              "id": "G11-BIOL-U2-S16",
              "title": "2.5 Animal Behavior",
              "startPage": 54
            },
            {
              "id": "G11-BIOL-U2-S17",
              "title": "2.5.1 Types of Animal Behavior",
              "startPage": 54
            },
            {
              "id": "G11-BIOL-U2-S18",
              "title": "2.5.2 Patterns of Behavior",
              "startPage": 58
            },
            {
              "id": "G11-BIOL-U2-S19",
              "title": "2.6 Homeostasis in animals",
              "startPage": 61
            },
            {
              "id": "G11-BIOL-U2-S20",
              "title": "2.6.1 Thermoregulation",
              "startPage": 62
            },
            {
              "id": "G11-BIOL-U2-S21",
              "title": "2.6.2 Osmoregulation",
              "startPage": 67
            },
            {
              "id": "G11-BIOL-U2-S22",
              "title": "2.6.3 Blood Sugar Regulation",
              "startPage": 68
            },
            {
              "id": "G11-BIOL-U2-S23",
              "title": "2.6.4 Control of homeostasis",
              "startPage": 70
            },
            {
              "id": "G11-BIOL-U2-S24",
              "title": "2.7 Renowned zoologists in Ethiopia",
              "startPage": 71
            }
          ]
        },
        {
          "id": "G11-BIOL-U3",
          "number": "3",
          "title": "Enzymes",
          "startPage": 79,
          "endPage": 112,
          "sections": [
            {
              "id": "G11-BIOL-U3-S1",
              "title": "3.1 What are enzymes?",
              "startPage": 80
            },
            {
              "id": "G11-BIOL-U3-S2",
              "title": "3.2 Properties and functions of enzymes",
              "startPage": 82
            },
            {
              "id": "G11-BIOL-U3-S3",
              "title": "3.2.1 General properties of an enzyme",
              "startPage": 82
            },
            {
              "id": "G11-BIOL-U3-S4",
              "title": "3.2.2 The function of enzymes",
              "startPage": 85
            },
            {
              "id": "G11-BIOL-U3-S5",
              "title": "3.3 Protein structures",
              "startPage": 88
            },
            {
              "id": "G11-BIOL-U3-S6",
              "title": "3.4 Enzyme substrate models",
              "startPage": 92
            },
            {
              "id": "G11-BIOL-U3-S7",
              "title": "3.4.1 Enzyme-substrate binding models",
              "startPage": 92
            },
            {
              "id": "G11-BIOL-U3-S8",
              "title": "3.4.2 Enzymatic transition state",
              "startPage": 93
            },
            {
              "id": "G11-BIOL-U3-S9",
              "title": "3.5 Enzyme regulation",
              "startPage": 94
            },
            {
              "id": "G11-BIOL-U3-S10",
              "title": "3.6 Types of enzymes",
              "startPage": 97
            },
            {
              "id": "G11-BIOL-U3-S11",
              "title": "3.6.1 Enzyme structural classification",
              "startPage": 98
            },
            {
              "id": "G11-BIOL-U3-S12",
              "title": "3.6.2 Basic classification of enzymes",
              "startPage": 98
            },
            {
              "id": "G11-BIOL-U3-S13",
              "title": "3.7 Factors affecting enzyme action",
              "startPage": 100
            },
            {
              "id": "G11-BIOL-U3-S14",
              "title": "3.7.1 Description on factors affecting enzymatic actions",
              "startPage": 101
            },
            {
              "id": "G11-BIOL-U3-S15",
              "title": "3.8 Enzyme kinetics",
              "startPage": 102
            },
            {
              "id": "G11-BIOL-U3-S16",
              "title": "3.9 Application of enzymes in industries and their benefits",
              "startPage": 104
            },
            {
              "id": "G11-BIOL-U3-S17",
              "title": "3.9.1 Uses of enzyme application",
              "startPage": 105
            },
            {
              "id": "G11-BIOL-U3-S18",
              "title": "3.10 Malting in Ethiopian tradition",
              "startPage": 106
            },
            {
              "id": "G11-BIOL-U3-S19",
              "title": "3.10.1 Steps of modern malting",
              "startPage": 107
            },
            {
              "id": "G11-BIOL-U3-S20",
              "title": "3.10.2 Why is malting for?",
              "startPage": 107
            },
            {
              "id": "G11-BIOL-U3-S21",
              "title": "3.10.3 Traditional malting for local alcohol production",
              "startPage": 108
            },
            {
              "id": "G11-BIOL-U3-S22",
              "title": "3.11 Renowned Biochemists in Ethiopia",
              "startPage": 109
            }
          ]
        },
        {
          "id": "G11-BIOL-U4",
          "number": "4",
          "title": "Genetics",
          "startPage": 113,
          "endPage": 179,
          "sections": [
            {
              "id": "G11-BIOL-U4-S1",
              "title": "4.1 The genetic materials",
              "startPage": 114
            },
            {
              "id": "G11-BIOL-U4-S2",
              "title": "4.2 The structure and function of DNA and RNA",
              "startPage": 115
            },
            {
              "id": "G11-BIOL-U4-S3",
              "title": "4.2.1 The Structure and function of DNA",
              "startPage": 115
            },
            {
              "id": "G11-BIOL-U4-S4",
              "title": "4.2.3 DNA replication",
              "startPage": 120
            },
            {
              "id": "G11-BIOL-U4-S5",
              "title": "4.2.2 The structure and function of RNA",
              "startPage": 123
            },
            {
              "id": "G11-BIOL-U4-S6",
              "title": "4.3 The process of cell division",
              "startPage": 124
            },
            {
              "id": "G11-BIOL-U4-S7",
              "title": "4.3.1 Cell Division",
              "startPage": 125
            },
            {
              "id": "G11-BIOL-U4-S8",
              "title": "4.4 Protein synthesis",
              "startPage": 133
            },
            {
              "id": "G11-BIOL-U4-S9",
              "title": "4.5 Mendelian inheritance",
              "startPage": 137
            },
            {
              "id": "G11-BIOL-U4-S10",
              "title": "4.5.1 Mendelian crosses",
              "startPage": 138
            },
            {
              "id": "G11-BIOL-U4-S11",
              "title": "4.5.2 Monohybrid cross",
              "startPage": 139
            },
            {
              "id": "G11-BIOL-U4-S12",
              "title": "4.5.3 Dihybrid Cross",
              "startPage": 142
            },
            {
              "id": "G11-BIOL-U4-S13",
              "title": "4.5.4 Test Crosses",
              "startPage": 144
            },
            {
              "id": "G11-BIOL-U4-S14",
              "title": "4.6 Sex determination",
              "startPage": 146
            },
            {
              "id": "G11-BIOL-U4-S15",
              "title": "4.7 Non-Mendelian inheritance",
              "startPage": 148
            },
            {
              "id": "G11-BIOL-U4-S16",
              "title": "4.7.1 Co-dominance, Incomplete dominance and Multiple alleles",
              "startPage": 149
            },
            {
              "id": "G11-BIOL-U4-S17",
              "title": "4.7.2 Rh factor inheritance in humans and its medical importance",
              "startPage": 152
            },
            {
              "id": "G11-BIOL-U4-S18",
              "title": "4.7.3 Sex-linked inheritance in humans",
              "startPage": 153
            },
            {
              "id": "G11-BIOL-U4-S19",
              "title": "4.7.4 Environmental effects on phenotype",
              "startPage": 154
            },
            {
              "id": "G11-BIOL-U4-S20",
              "title": "4.8 Human pedigree analysis and its importance",
              "startPage": 155
            },
            {
              "id": "G11-BIOL-U4-S21",
              "title": "4.9 Genetic disorders",
              "startPage": 159
            },
            {
              "id": "G11-BIOL-U4-S22",
              "title": "4.10 Genetic testing and counseling",
              "startPage": 164
            },
            {
              "id": "G11-BIOL-U4-S23",
              "title": "4.11 Gene therapy",
              "startPage": 165
            },
            {
              "id": "G11-BIOL-U4-S24",
              "title": "4.12 Breeding",
              "startPage": 167
            },
            {
              "id": "G11-BIOL-U4-S25",
              "title": "4.12.1 Indigenous knowledge of Ethiopian farmers",
              "startPage": 170
            },
            {
              "id": "G11-BIOL-U4-S26",
              "title": "4.13 Bioinformatics introduction",
              "startPage": 171
            }
          ]
        },
        {
          "id": "G11-BIOL-U5",
          "number": "5",
          "title": "The human body systems",
          "startPage": 180,
          "endPage": 235,
          "sections": [
            {
              "id": "G11-BIOL-U5-S1",
              "title": "5.1 Human Musculoskeletal Systems",
              "startPage": 181
            },
            {
              "id": "G11-BIOL-U5-S2",
              "title": "5.1.1 Types of muscles",
              "startPage": 182
            },
            {
              "id": "G11-BIOL-U5-S3",
              "title": "5.1.2 Mechanism of actions of skeletal muscles",
              "startPage": 185
            },
            {
              "id": "G11-BIOL-U5-S4",
              "title": "5.1.3 The human axial and appendicular skeletons",
              "startPage": 187
            },
            {
              "id": "G11-BIOL-U5-S5",
              "title": "5.1.4 Joints",
              "startPage": 190
            },
            {
              "id": "G11-BIOL-U5-S6",
              "title": "5.2 The reproductive system",
              "startPage": 192
            },
            {
              "id": "G11-BIOL-U5-S7",
              "title": "5.2.1 Human reproductive system (Male and Female)",
              "startPage": 192
            },
            {
              "id": "G11-BIOL-U5-S8",
              "title": "5.2.2 Gametogenesis",
              "startPage": 196
            },
            {
              "id": "G11-BIOL-U5-S9",
              "title": "5.2.2 Positive and negative feedbacks to control the menstrual cycle",
              "startPage": 201
            },
            {
              "id": "G11-BIOL-U5-S10",
              "title": "5.2.3 Fertilization and pregnancy",
              "startPage": 203
            },
            {
              "id": "G11-BIOL-U5-S11",
              "title": "5.2.4 Mechanism of action of contraceptives",
              "startPage": 204
            },
            {
              "id": "G11-BIOL-U5-S12",
              "title": "5.2.5 Causes of infertility in humans",
              "startPage": 209
            },
            {
              "id": "G11-BIOL-U5-S13",
              "title": "5.2.6 The major sexually transmitted infections (STIs) in Ethiopia",
              "startPage": 212
            },
            {
              "id": "G11-BIOL-U5-S14",
              "title": "5.2.8 Epidemiology of STIs in Ethiopia",
              "startPage": 220
            },
            {
              "id": "G11-BIOL-U5-S15",
              "title": "5.3 Harmful traditional practices",
              "startPage": 222
            },
            {
              "id": "G11-BIOL-U5-S16",
              "title": "5.3.1 Harmful traditional practices",
              "startPage": 222
            },
            {
              "id": "G11-BIOL-U5-S17",
              "title": "5.4 Family planning",
              "startPage": 223
            },
            {
              "id": "G11-BIOL-U5-S18",
              "title": "5.4.1 Risks related to the lack of family planning",
              "startPage": 223
            },
            {
              "id": "G11-BIOL-U5-S19",
              "title": "5.4.2 Family planning actions",
              "startPage": 224
            },
            {
              "id": "G11-BIOL-U5-S20",
              "title": "5.4.3 Family planning services",
              "startPage": 225
            },
            {
              "id": "G11-BIOL-U5-S21",
              "title": "5.5 Effects of alcohol use, chewing Khat, cannabis and other drug uses on STIs transmission and unwanted pregnancy",
              "startPage": 225
            },
            {
              "id": "G11-BIOL-U5-S22",
              "title": "5.5.1 The effects of alcohol uses",
              "startPage": 225
            },
            {
              "id": "G11-BIOL-U5-S23",
              "title": "5.5.2 Effects of chewing Khat",
              "startPage": 226
            },
            {
              "id": "G11-BIOL-U5-S24",
              "title": "5.5.3 Effects of drug uses",
              "startPage": 227
            }
          ]
        },
        {
          "id": "G11-BIOL-U6",
          "number": "6",
          "title": "Population and natural resources",
          "startPage": 236,
          "endPage": 294,
          "sections": [
            {
              "id": "G11-BIOL-U6-S1",
              "title": "6.1 Population ecology",
              "startPage": 237
            },
            {
              "id": "G11-BIOL-U6-S2",
              "title": "6.1.1 Population size, density and dispersal",
              "startPage": 238
            },
            {
              "id": "G11-BIOL-U6-S3",
              "title": "6.1.2 Exponential and logistic growth in populations",
              "startPage": 243
            },
            {
              "id": "G11-BIOL-U6-S4",
              "title": "6.1.3 Demographic structure",
              "startPage": 247
            },
            {
              "id": "G11-BIOL-U6-S5",
              "title": "6.1.4 Population regulation",
              "startPage": 252
            },
            {
              "id": "G11-BIOL-U6-S6",
              "title": "6.2 Natural resources",
              "startPage": 254
            },
            {
              "id": "G11-BIOL-U6-S7",
              "title": "6.2.1 Renewable",
              "startPage": 255
            },
            {
              "id": "G11-BIOL-U6-S8",
              "title": "6.2.2 Non-renewable",
              "startPage": 255
            },
            {
              "id": "G11-BIOL-U6-S9",
              "title": "6.3 Conservation of natural resources in Ethiopia",
              "startPage": 256
            },
            {
              "id": "G11-BIOL-U6-S10",
              "title": "6.4 Impact of traffic accident on wild and domestic animals",
              "startPage": 262
            },
            {
              "id": "G11-BIOL-U6-S11",
              "title": "6.5 Impact of human activities on the environment",
              "startPage": 265
            },
            {
              "id": "G11-BIOL-U6-S12",
              "title": "6.5.2 Climate change",
              "startPage": 268
            },
            {
              "id": "G11-BIOL-U6-S13",
              "title": "6.5.3 Global warming",
              "startPage": 269
            },
            {
              "id": "G11-BIOL-U6-S14",
              "title": "6.5.4 Ozone layer depletion",
              "startPage": 271
            },
            {
              "id": "G11-BIOL-U6-S15",
              "title": "6.5.5 Acid rain",
              "startPage": 273
            },
            {
              "id": "G11-BIOL-U6-S16",
              "title": "6.5.6 Loss of Biodiversity",
              "startPage": 274
            },
            {
              "id": "G11-BIOL-U6-S17",
              "title": "6.5.7 Toxic bioaccumulation",
              "startPage": 277
            },
            {
              "id": "G11-BIOL-U6-S18",
              "title": "6.5.8 Resource depletion",
              "startPage": 278
            },
            {
              "id": "G11-BIOL-U6-S19",
              "title": "6.6 Indigenous conservation practices in Ethiopia",
              "startPage": 279
            }
          ]
        }
      ]
    },
    "12": {
      "bookId": 12,
      "bookTitle": "G12-Biology-STB-2023-web (1).pdf",
      "pdfPages": 358,
      "sourceStatus": "verified-from-supplied-textbook-TOC",
      "note": "Section wording is intentionally kept at the granularity safely recoverable from the supplied source. The textbook contains scan-heavy regions, so no missing headings are invented.",
      "units": [
        {
          "id": "G12-BIOL-U1",
          "number": "1",
          "title": "APPLICATION OF BIOLOGY",
          "startPage": 6,
          "endPage": 39,
          "sections": [
            {
              "id": "G12-BIOL-U1-S1",
              "title": "1.2 Appreciation of nature",
              "startPage": 6
            },
            {
              "id": "G12-BIOL-U1-S2",
              "title": "1.3 Conservation of natural resources",
              "startPage": 7
            },
            {
              "id": "G12-BIOL-U1-S3",
              "title": "1.4 Food security",
              "startPage": 13
            },
            {
              "id": "G12-BIOL-U1-S4",
              "title": "1.5 Creating conscious citizens and ensuring sustainable development",
              "startPage": 14
            },
            {
              "id": "G12-BIOL-U1-S5",
              "title": "1.5.1 Development of careers",
              "startPage": 17
            },
            {
              "id": "G12-BIOL-U1-S6",
              "title": "1.6 Medicine",
              "startPage": 18
            },
            {
              "id": "G12-BIOL-U1-S7",
              "title": "1.7 Waste treatment",
              "startPage": 21
            },
            {
              "id": "G12-BIOL-U1-S8",
              "title": "1.8 Biotechnology",
              "startPage": 22
            },
            {
              "id": "G12-BIOL-U1-S9",
              "title": "1.9 Promises of biology to the society",
              "startPage": 36
            },
            {
              "id": "G12-BIOL-U1-S10",
              "title": "1.10 Unit summary",
              "startPage": 38
            },
            {
              "id": "G12-BIOL-U1-S11",
              "title": "1.11 Review questions",
              "startPage": 39
            }
          ]
        },
        {
          "id": "G12-BIOL-U2",
          "number": "2",
          "title": "MICROORGANISMS",
          "startPage": 40,
          "endPage": 113,
          "sections": [
            {
              "id": "G12-BIOL-U2-S1",
              "title": "2.1 What are Microorganisms?",
              "startPage": 40
            },
            {
              "id": "G12-BIOL-U2-S2",
              "title": "2.2 Types of microorganisms",
              "startPage": 41
            },
            {
              "id": "G12-BIOL-U2-S3",
              "title": "2.2.1 Eubacteria",
              "startPage": 45
            },
            {
              "id": "G12-BIOL-U2-S4",
              "title": "2.2.2 Archaea",
              "startPage": 57
            },
            {
              "id": "G12-BIOL-U2-S5",
              "title": "2.2.3 Fungi",
              "startPage": 60
            },
            {
              "id": "G12-BIOL-U2-S6",
              "title": "2.2.4 Protozoa",
              "startPage": 65
            },
            {
              "id": "G12-BIOL-U2-S7",
              "title": "2.3 Viruses",
              "startPage": 73
            },
            {
              "id": "G12-BIOL-U2-S8",
              "title": "2.4 Economic importance of microorganisms",
              "startPage": 90
            },
            {
              "id": "G12-BIOL-U2-S9",
              "title": "2.5 The role of bacteria in recycling minerals through ecosystems",
              "startPage": 98
            },
            {
              "id": "G12-BIOL-U2-S10",
              "title": "2.5.1 Common disease-causing microorganisms",
              "startPage": 104
            },
            {
              "id": "G12-BIOL-U2-S11",
              "title": "2.6 Unit summary",
              "startPage": 112
            },
            {
              "id": "G12-BIOL-U2-S12",
              "title": "2.7 Unit review questions",
              "startPage": 113
            }
          ]
        },
        {
          "id": "G12-BIOL-U3",
          "number": "3",
          "title": "ENERGY TRANSFORMATION",
          "startPage": 114,
          "endPage": 160,
          "sections": [
            {
              "id": "G12-BIOL-U3-S1",
              "title": "3.1 Energy",
              "startPage": 114
            },
            {
              "id": "G12-BIOL-U3-S2",
              "title": "3.1 Chemical structure of carbohydrates and lipids",
              "startPage": 115
            },
            {
              "id": "G12-BIOL-U3-S3",
              "title": "3.2 Lipids",
              "startPage": 123
            },
            {
              "id": "G12-BIOL-U3-S4",
              "title": "3.3 Cellular metabolism",
              "startPage": 127
            },
            {
              "id": "G12-BIOL-U3-S5",
              "title": "3.4 Photosynthesis",
              "startPage": 130
            },
            {
              "id": "G12-BIOL-U3-S6",
              "title": "3.4.1 The place/site of photosynthesis",
              "startPage": 131
            },
            {
              "id": "G12-BIOL-U3-S7",
              "title": "3.4.2 Photosynthetic pigments",
              "startPage": 133
            },
            {
              "id": "G12-BIOL-U3-S8",
              "title": "3.4.3 Light-dependent and light-independent reactions",
              "startPage": 135
            },
            {
              "id": "G12-BIOL-U3-S9",
              "title": "3.4.4 Contributions of photosynthesis for the continuity of life, for O2 and CO2 balance and global warming",
              "startPage": 144
            },
            {
              "id": "G12-BIOL-U3-S10",
              "title": "3.5 Review questions",
              "startPage": 144
            },
            {
              "id": "G12-BIOL-U3-S11",
              "title": "3.6 Cellular Respiration",
              "startPage": 145
            },
            {
              "id": "G12-BIOL-U3-S12",
              "title": "3.6.1 The site/place of cellular respiration",
              "startPage": 148
            },
            {
              "id": "G12-BIOL-U3-S13",
              "title": "3.6.2 Stages of respiration",
              "startPage": 148
            },
            {
              "id": "G12-BIOL-U3-S14",
              "title": "3.7 Fermentation",
              "startPage": 157
            },
            {
              "id": "G12-BIOL-U3-S15",
              "title": "3.8 Unit review questions",
              "startPage": 160
            }
          ]
        },
        {
          "id": "G12-BIOL-U4",
          "number": "4",
          "title": "EVOLUTION",
          "startPage": 161,
          "endPage": 235,
          "sections": [
            {
              "id": "G12-BIOL-U4-S1",
              "title": "4.1 Evolution",
              "startPage": 161
            },
            {
              "id": "G12-BIOL-U4-S2",
              "title": "4.1.1 Definition",
              "startPage": 162
            },
            {
              "id": "G12-BIOL-U4-S3",
              "title": "4.1.2 Theories of evolution: Lamarck Vs Darwin",
              "startPage": 171
            },
            {
              "id": "G12-BIOL-U4-S4",
              "title": "4.1.3 The evidence for evolution",
              "startPage": 177
            },
            {
              "id": "G12-BIOL-U4-S5",
              "title": "4.1.4 Natural selection: Definition, Types & Examples",
              "startPage": 188
            },
            {
              "id": "G12-BIOL-U4-S6",
              "title": "4.1.5 Human evolution",
              "startPage": 200
            },
            {
              "id": "G12-BIOL-U4-S7",
              "title": "4.2 Mutations",
              "startPage": 208
            },
            {
              "id": "G12-BIOL-U4-S8",
              "title": "4.3 Genetic Drift",
              "startPage": 215
            },
            {
              "id": "G12-BIOL-U4-S9",
              "title": "4.4 Gene flow",
              "startPage": 223
            },
            {
              "id": "G12-BIOL-U4-S10",
              "title": "4.5 Causes of species extinction",
              "startPage": 224
            },
            {
              "id": "G12-BIOL-U4-S11",
              "title": "4.6 Renowned anthropologists in Ethiopia",
              "startPage": 224
            },
            {
              "id": "G12-BIOL-U4-S12",
              "title": "4.7 Renowned evolutionists in Ethiopia",
              "startPage": 225
            }
          ]
        },
        {
          "id": "G12-BIOL-U5",
          "number": "5",
          "title": "HUMAN BODY SYSTEM",
          "startPage": 236,
          "endPage": 332,
          "sections": [
            {
              "id": "G12-BIOL-U5-S1",
              "title": "5.1 THE NERVOUS SYSTEM",
              "startPage": 238
            },
            {
              "id": "G12-BIOL-U5-S2",
              "title": "5.2 SENSE ORGANS",
              "startPage": 273
            },
            {
              "id": "G12-BIOL-U5-S3",
              "title": "5.3 HOMEOSTASIS IN THE HUMAN BODY",
              "startPage": 317
            },
            {
              "id": "G12-BIOL-U5-S4",
              "title": "5.3.1 The structure and function of the human kidney",
              "startPage": 317
            }
          ]
        },
        {
          "id": "G12-BIOL-U6",
          "number": "6",
          "title": "CLIMATE CHANGE",
          "startPage": 333,
          "endPage": 358,
          "sections": [
            {
              "id": "G12-BIOL-U6-S1",
              "title": "6.1 CLIMATE CHANGE: CAUSES AND EFFECTS",
              "startPage": 333
            },
            {
              "id": "G12-BIOL-U6-S2",
              "title": "6.1.1 Definition of Climate Change",
              "startPage": 333
            },
            {
              "id": "G12-BIOL-U6-S3",
              "title": "6.1.2 Causes of climate change",
              "startPage": 334
            },
            {
              "id": "G12-BIOL-U6-S4",
              "title": "6.2 EFFECTS OF CLIMATE CHANGE",
              "startPage": 339
            },
            {
              "id": "G12-BIOL-U6-S5",
              "title": "6.3 INTERNATIONAL CONVENTIONS",
              "startPage": 348
            }
          ]
        }
      ]
    }
  },
  "English": {
    "9": {
      "bookId": 17,
      "bookTitle": "G9-English-STB-2023-web.pdf",
      "pdfPages": 237,
      "sourceStatus": "verified-from-supplied-textbook-TOC",
      "note": "Grade 9 English section labels are preserved at the verified page-anchor level from the supplied textbook analysis; source numbering order is preserved where it differed from numeric sorting.",
      "units": [
        {
          "id": "G9-ENGL-U1",
          "number": "1",
          "title": "Living in Urban Areas",
          "startPage": 1,
          "endPage": 31,
          "sections": [
            {
              "id": "G9-ENGL-U1-S1",
              "title": "1.1 Listening",
              "startPage": 2
            },
            {
              "id": "G9-ENGL-U1-S2",
              "title": "1.2 Reading",
              "startPage": 4
            },
            {
              "id": "G9-ENGL-U1-S3",
              "title": "1.3 Vocabulary Development",
              "startPage": 8
            },
            {
              "id": "G9-ENGL-U1-S4",
              "title": "1.4 Grammar",
              "startPage": 11
            },
            {
              "id": "G9-ENGL-U1-S5",
              "title": "1.5 Speaking Skills",
              "startPage": 26
            },
            {
              "id": "G9-ENGL-U1-S6",
              "title": "1.6 Writing Skills",
              "startPage": 30
            }
          ]
        },
        {
          "id": "G9-ENGL-U2",
          "number": "2",
          "title": "Study Skills",
          "startPage": 32,
          "endPage": 59,
          "sections": [
            {
              "id": "G9-ENGL-U2-S1",
              "title": "2.1 Listening Skills",
              "startPage": 33
            },
            {
              "id": "G9-ENGL-U2-S2",
              "title": "2.2 Reading Skills",
              "startPage": 34
            },
            {
              "id": "G9-ENGL-U2-S3",
              "title": "2.3 Vocabulary Development",
              "startPage": 39
            },
            {
              "id": "G9-ENGL-U2-S4",
              "title": "2.4 Grammar",
              "startPage": 41
            },
            {
              "id": "G9-ENGL-U2-S5",
              "title": "2.5 Speaking Skills",
              "startPage": 53
            },
            {
              "id": "G9-ENGL-U2-S6",
              "title": "2.6 Writing Skills",
              "startPage": 57
            }
          ]
        },
        {
          "id": "G9-ENGL-U3",
          "number": "3",
          "title": "Traffic Accident",
          "startPage": 60,
          "endPage": 85,
          "sections": [
            {
              "id": "G9-ENGL-U3-S1",
              "title": "3.1 Listening Skills",
              "startPage": 61
            },
            {
              "id": "G9-ENGL-U3-S2",
              "title": "3.2 Reading Skills",
              "startPage": 63
            },
            {
              "id": "G9-ENGL-U3-S3",
              "title": "3.3 Vocabulary Development",
              "startPage": 66
            },
            {
              "id": "G9-ENGL-U3-S4",
              "title": "3.4 Grammar",
              "startPage": 67
            },
            {
              "id": "G9-ENGL-U3-S5",
              "title": "3.5 Speaking skills",
              "startPage": 80
            },
            {
              "id": "G9-ENGL-U3-S6",
              "title": "3.6 Writing Skills",
              "startPage": 82
            }
          ]
        },
        {
          "id": "G9-ENGL-U4",
          "number": "4",
          "title": "National Parks",
          "startPage": 86,
          "endPage": 105,
          "sections": [
            {
              "id": "G9-ENGL-U4-S1",
              "title": "4.1 Listening Skills",
              "startPage": 87
            },
            {
              "id": "G9-ENGL-U4-S2",
              "title": "4.2 Reading skills",
              "startPage": 88
            },
            {
              "id": "G9-ENGL-U4-S3",
              "title": "4.3 Vocabulary Development",
              "startPage": 95
            },
            {
              "id": "G9-ENGL-U4-S4",
              "title": "4.4 Grammar",
              "startPage": 97
            },
            {
              "id": "G9-ENGL-U4-S5",
              "title": "4.5 Speaking Skills",
              "startPage": 102
            },
            {
              "id": "G9-ENGL-U4-S6",
              "title": "4.6 Writing Skills",
              "startPage": 103
            }
          ]
        },
        {
          "id": "G9-ENGL-U5",
          "number": "5",
          "title": "Horticulture",
          "startPage": 106,
          "endPage": 122,
          "sections": [
            {
              "id": "G9-ENGL-U5-S1",
              "title": "5.1 Listening skills",
              "startPage": 107
            },
            {
              "id": "G9-ENGL-U5-S2",
              "title": "5.2 Reading Skills",
              "startPage": 109
            },
            {
              "id": "G9-ENGL-U5-S3",
              "title": "5.3 Vocabulary Development",
              "startPage": 112
            },
            {
              "id": "G9-ENGL-U5-S4",
              "title": "5.4 Grammar",
              "startPage": 113
            },
            {
              "id": "G9-ENGL-U5-S5",
              "title": "5.5 Speaking Skills",
              "startPage": 118
            },
            {
              "id": "G9-ENGL-U5-S6",
              "title": "5.6 Writing Skills",
              "startPage": 121
            }
          ]
        },
        {
          "id": "G9-ENGL-U6",
          "number": "6",
          "title": "Poverty in Ethiopia",
          "startPage": 123,
          "endPage": 140,
          "sections": [
            {
              "id": "G9-ENGL-U6-S1",
              "title": "6.1 Listening skills",
              "startPage": 124
            },
            {
              "id": "G9-ENGL-U6-S2",
              "title": "6.2 Reading Skills",
              "startPage": 126
            },
            {
              "id": "G9-ENGL-U6-S3",
              "title": "6.3 Vocabulary Development",
              "startPage": 129
            },
            {
              "id": "G9-ENGL-U6-S4",
              "title": "6.4 Grammar",
              "startPage": 132
            },
            {
              "id": "G9-ENGL-U6-S5",
              "title": "6.5 Speaking Skills",
              "startPage": 137
            },
            {
              "id": "G9-ENGL-U6-S6",
              "title": "6.6 Writing Skills",
              "startPage": 139
            }
          ]
        },
        {
          "id": "G9-ENGL-U7",
          "number": "7",
          "title": "Community Services",
          "startPage": 141,
          "endPage": 159,
          "sections": [
            {
              "id": "G9-ENGL-U7-S1",
              "title": "7.1 Listening skills: Community Services",
              "startPage": 142
            },
            {
              "id": "G9-ENGL-U7-S2",
              "title": "7.2 Reading Skills",
              "startPage": 144
            },
            {
              "id": "G9-ENGL-U7-S3",
              "title": "7.3 Vocabulary Development",
              "startPage": 146
            },
            {
              "id": "G9-ENGL-U7-S4",
              "title": "7.4 Grammar",
              "startPage": 148
            },
            {
              "id": "G9-ENGL-U7-S5",
              "title": "7.5 Speaking Skills",
              "startPage": 155
            },
            {
              "id": "G9-ENGL-U7-S6",
              "title": "7.6 Writing Skills",
              "startPage": 156
            }
          ]
        },
        {
          "id": "G9-ENGL-U8",
          "number": "8",
          "title": "Communicable Diseases",
          "startPage": 160,
          "endPage": 179,
          "sections": [
            {
              "id": "G9-ENGL-U8-S1",
              "title": "8.1 Listening Skills",
              "startPage": 161
            },
            {
              "id": "G9-ENGL-U8-S2",
              "title": "8.2 Reading Skills",
              "startPage": 162
            },
            {
              "id": "G9-ENGL-U8-S3",
              "title": "8.3 Vocabulary Development",
              "startPage": 166
            },
            {
              "id": "G9-ENGL-U8-S4",
              "title": "8.4 Grammar",
              "startPage": 168
            },
            {
              "id": "G9-ENGL-U8-S5",
              "title": "8.5 Speaking Skills",
              "startPage": 176
            },
            {
              "id": "G9-ENGL-U8-S6",
              "title": "8.6 Writing Skills",
              "startPage": 179
            }
          ]
        },
        {
          "id": "G9-ENGL-U9",
          "number": "9",
          "title": "Fairness and Equity",
          "startPage": 180,
          "endPage": 202,
          "sections": [
            {
              "id": "G9-ENGL-U9-S1",
              "title": "9.1 Listening Skills",
              "startPage": 181
            },
            {
              "id": "G9-ENGL-U9-S2",
              "title": "9.2 Reading Skills",
              "startPage": 183
            },
            {
              "id": "G9-ENGL-U9-S3",
              "title": "9.3 Grammar",
              "startPage": 190
            },
            {
              "id": "G9-ENGL-U9-S4",
              "title": "9.4 Speaking Skills",
              "startPage": 197
            },
            {
              "id": "G9-ENGL-U9-S5",
              "title": "9.5 Writing Skills",
              "startPage": 200
            }
          ]
        },
        {
          "id": "G9-ENGL-U10",
          "number": "10",
          "title": "The Internet",
          "startPage": 203,
          "endPage": 237,
          "sections": [
            {
              "id": "G9-ENGL-U10-S1",
              "title": "10.1 Listening Skills",
              "startPage": 204
            },
            {
              "id": "G9-ENGL-U10-S2",
              "title": "10.2 Reading Skills",
              "startPage": 206
            },
            {
              "id": "G9-ENGL-U10-S3",
              "title": "10.3 Vocabulary Development",
              "startPage": 209
            },
            {
              "id": "G9-ENGL-U10-S4",
              "title": "10.4 Grammar",
              "startPage": 212
            },
            {
              "id": "G9-ENGL-U10-S5",
              "title": "10.5 Speaking Activity",
              "startPage": 217
            },
            {
              "id": "G9-ENGL-U10-S6",
              "title": "10.6 Writing Activity",
              "startPage": 219
            }
          ]
        }
      ]
    },
    "10": {
      "bookId": 18,
      "bookTitle": "G10-English-STB-2023-web.pdf",
      "pdfPages": 326,
      "sourceStatus": "verified-from-supplied-textbook-TOC",
      "note": "Grade 10 English section text is preserved from the supplied textbook TOC extraction.",
      "units": [
        {
          "id": "G10-ENGL-U1",
          "number": "1",
          "title": "Population Growth",
          "startPage": 1,
          "endPage": 36,
          "sections": [
            {
              "id": "G10-ENGL-U1-S1",
              "title": "1.1 Listening: Population Explosion",
              "startPage": 2
            },
            {
              "id": "G10-ENGL-U1-S2",
              "title": "1.2 Speaking",
              "startPage": 3
            },
            {
              "id": "G10-ENGL-U1-S3",
              "title": "1.3 Reading: Population Growth",
              "startPage": 7
            },
            {
              "id": "G10-ENGL-U1-S4",
              "title": "1.4 Grammar",
              "startPage": 18
            },
            {
              "id": "G10-ENGL-U1-S5",
              "title": "1.5 Writing",
              "startPage": 33
            }
          ]
        },
        {
          "id": "G10-ENGL-U2",
          "number": "2",
          "title": "Travel Behaviors",
          "startPage": 37,
          "endPage": 64,
          "sections": [
            {
              "id": "G10-ENGL-U2-S1",
              "title": "2.1 Listening: Travelling and Places",
              "startPage": 38
            },
            {
              "id": "G10-ENGL-U2-S2",
              "title": "2.2 Speaking",
              "startPage": 39
            },
            {
              "id": "G10-ENGL-U2-S3",
              "title": "2.3 Reading: Travel Behaviors",
              "startPage": 44
            },
            {
              "id": "G10-ENGL-U2-S4",
              "title": "2.4 Grammar",
              "startPage": 50
            },
            {
              "id": "G10-ENGL-U2-S5",
              "title": "2.5 Writing",
              "startPage": 52
            }
          ]
        },
        {
          "id": "G10-ENGL-U3",
          "number": "3",
          "title": "Punctuality",
          "startPage": 65,
          "endPage": 91,
          "sections": [
            {
              "id": "G10-ENGL-U3-S1",
              "title": "3.1 Listening: Punctual Students",
              "startPage": 66
            },
            {
              "id": "G10-ENGL-U3-S2",
              "title": "3.2 Speaking",
              "startPage": 69
            },
            {
              "id": "G10-ENGL-U3-S3",
              "title": "3.3 Reading: Punctuality",
              "startPage": 74
            },
            {
              "id": "G10-ENGL-U3-S4",
              "title": "3.4 Vocabulary",
              "startPage": 78
            },
            {
              "id": "G10-ENGL-U3-S5",
              "title": "3.5 Grammar",
              "startPage": 82
            },
            {
              "id": "G10-ENGL-U3-S6",
              "title": "3.6 Writing",
              "startPage": 89
            }
          ]
        },
        {
          "id": "G10-ENGL-U4",
          "number": "4",
          "title": "Tourist Attractions",
          "startPage": 92,
          "endPage": 118,
          "sections": [
            {
              "id": "G10-ENGL-U4-S1",
              "title": "4.1 Listening: Giving Information for Tourists",
              "startPage": 93
            },
            {
              "id": "G10-ENGL-U4-S2",
              "title": "4.2 Speaking",
              "startPage": 95
            },
            {
              "id": "G10-ENGL-U4-S3",
              "title": "4.3 Reading: Tourism",
              "startPage": 98
            },
            {
              "id": "G10-ENGL-U4-S4",
              "title": "4.4 Vocabulary",
              "startPage": 104
            },
            {
              "id": "G10-ENGL-U4-S5",
              "title": "4.5 Grammar",
              "startPage": 107
            },
            {
              "id": "G10-ENGL-U4-S6",
              "title": "4.6 Writing",
              "startPage": 115
            }
          ]
        },
        {
          "id": "G10-ENGL-U5",
          "number": "5",
          "title": "Honey Processing",
          "startPage": 119,
          "endPage": 143,
          "sections": [
            {
              "id": "G10-ENGL-U5-S1",
              "title": "5.1 Listening: Honey Processing",
              "startPage": 120
            },
            {
              "id": "G10-ENGL-U5-S2",
              "title": "5.2 Speaking",
              "startPage": 122
            },
            {
              "id": "G10-ENGL-U5-S3",
              "title": "5.3 Reading: The Importance of Honey",
              "startPage": 124
            },
            {
              "id": "G10-ENGL-U5-S4",
              "title": "5.4 Vocabulary",
              "startPage": 128
            },
            {
              "id": "G10-ENGL-U5-S5",
              "title": "5.5 Grammar",
              "startPage": 131
            },
            {
              "id": "G10-ENGL-U5-S6",
              "title": "5.6 Writing",
              "startPage": 139
            }
          ]
        },
        {
          "id": "G10-ENGL-U6",
          "number": "6",
          "title": "Migration",
          "startPage": 144,
          "endPage": 174,
          "sections": [
            {
              "id": "G10-ENGL-U6-S1",
              "title": "6.1 Listening:",
              "startPage": 145
            },
            {
              "id": "G10-ENGL-U6-S2",
              "title": "6.2 Speaking",
              "startPage": 148
            },
            {
              "id": "G10-ENGL-U6-S3",
              "title": "6.3 Reading: Migration in Ethiopia",
              "startPage": 150
            },
            {
              "id": "G10-ENGL-U6-S4",
              "title": "6.4 Vocabulary",
              "startPage": 155
            },
            {
              "id": "G10-ENGL-U6-S5",
              "title": "6.5 Grammar: Tense",
              "startPage": 159
            },
            {
              "id": "G10-ENGL-U6-S6",
              "title": "6.6 Writing",
              "startPage": 166
            }
          ]
        },
        {
          "id": "G10-ENGL-U7",
          "number": "7",
          "title": "Branding Ethiopia and National Identity",
          "startPage": 175,
          "endPage": 216,
          "sections": [
            {
              "id": "G10-ENGL-U7-S1",
              "title": "7.1 Listening",
              "startPage": 176
            },
            {
              "id": "G10-ENGL-U7-S2",
              "title": "7.2 Speaking",
              "startPage": 179
            },
            {
              "id": "G10-ENGL-U7-S3",
              "title": "7.3 Reading",
              "startPage": 191
            },
            {
              "id": "G10-ENGL-U7-S4",
              "title": "7.4 Vocabulary",
              "startPage": 196
            },
            {
              "id": "G10-ENGL-U7-S5",
              "title": "7.5 Grammar",
              "startPage": 202
            },
            {
              "id": "G10-ENGL-U7-S6",
              "title": "7.6 Writing",
              "startPage": 211
            }
          ]
        },
        {
          "id": "G10-ENGL-U8",
          "number": "8",
          "title": "The Healing Power of Plants",
          "startPage": 217,
          "endPage": 242,
          "sections": [
            {
              "id": "G10-ENGL-U8-S1",
              "title": "8.1 Listening",
              "startPage": 218
            },
            {
              "id": "G10-ENGL-U8-S2",
              "title": "8.2 Speaking",
              "startPage": 220
            },
            {
              "id": "G10-ENGL-U8-S3",
              "title": "8.3 Reading: A Traditional Medicine, Moringa Olifera",
              "startPage": 227
            },
            {
              "id": "G10-ENGL-U8-S4",
              "title": "8.4 Vocabulary",
              "startPage": 231
            },
            {
              "id": "G10-ENGL-U8-S5",
              "title": "8.5 Grammar",
              "startPage": 235
            },
            {
              "id": "G10-ENGL-U8-S6",
              "title": "8.6 Writing",
              "startPage": 241
            }
          ]
        },
        {
          "id": "G10-ENGL-U9",
          "number": "9",
          "title": "Multilingualism",
          "startPage": 243,
          "endPage": 272,
          "sections": [
            {
              "id": "G10-ENGL-U9-S1",
              "title": "9.1 Listening: Multilingualism",
              "startPage": 244
            },
            {
              "id": "G10-ENGL-U9-S2",
              "title": "9.2 Speaking",
              "startPage": 246
            },
            {
              "id": "G10-ENGL-U9-S3",
              "title": "9.3 Reading : Cognitive Benefits of being Multilingual",
              "startPage": 247
            },
            {
              "id": "G10-ENGL-U9-S4",
              "title": "9.4 Writing: Letters Writing",
              "startPage": 253
            },
            {
              "id": "G10-ENGL-U9-S5",
              "title": "9.5 Grammar",
              "startPage": 256
            },
            {
              "id": "G10-ENGL-U9-S6",
              "title": "9.6 Vocabulary",
              "startPage": 270
            }
          ]
        },
        {
          "id": "G10-ENGL-U10",
          "number": "10",
          "title": "Digital Vs Satellite Television",
          "startPage": 273,
          "endPage": 326,
          "sections": [
            {
              "id": "G10-ENGL-U10-S1",
              "title": "10.1 Listening",
              "startPage": 274
            },
            {
              "id": "G10-ENGL-U10-S2",
              "title": "10.2 Speaking",
              "startPage": 276
            },
            {
              "id": "G10-ENGL-U10-S3",
              "title": "10.3 Reading",
              "startPage": 279
            },
            {
              "id": "G10-ENGL-U10-S4",
              "title": "10.4 Vocabulary",
              "startPage": 282
            },
            {
              "id": "G10-ENGL-U10-S5",
              "title": "10.5 Grammar",
              "startPage": 285
            },
            {
              "id": "G10-ENGL-U10-S6",
              "title": "10.6 Writing",
              "startPage": 295
            }
          ]
        }
      ]
    },
    "11": {
      "bookId": 19,
      "bookTitle": "G11-English-STB-2023-web-1.pdf",
      "pdfPages": 290,
      "sourceStatus": "verified-from-supplied-textbook-TOC",
      "note": "Grade 11 English is mapped from the supplied textbook analysis, including Appendix I and Appendix II anchors.",
      "units": [
        {
          "id": "G11-ENGL-U1",
          "number": "1",
          "title": "Environmental Hazards",
          "startPage": 1,
          "endPage": 32,
          "sections": [
            {
              "id": "G11-ENGL-U1-S1",
              "title": "1A Listening Skills",
              "startPage": 2
            },
            {
              "id": "G11-ENGL-U1-S2",
              "title": "1B Speaking Skills",
              "startPage": 4
            },
            {
              "id": "G11-ENGL-U1-S3",
              "title": "1C Reading Skills",
              "startPage": 9
            },
            {
              "id": "G11-ENGL-U1-S4",
              "title": "1D Vocabulary Skills",
              "startPage": 13
            },
            {
              "id": "G11-ENGL-U1-S5",
              "title": "1E Grammar Skills",
              "startPage": 18
            },
            {
              "id": "G11-ENGL-U1-S6",
              "title": "1F Writing Skills",
              "startPage": 27
            }
          ]
        },
        {
          "id": "G11-ENGL-U2",
          "number": "2",
          "title": "Civilization",
          "startPage": 33,
          "endPage": 63,
          "sections": [
            {
              "id": "G11-ENGL-U2-S1",
              "title": "2A Listening Skills",
              "startPage": 34
            },
            {
              "id": "G11-ENGL-U2-S2",
              "title": "2B Speaking Skills",
              "startPage": 38
            },
            {
              "id": "G11-ENGL-U2-S3",
              "title": "2C Reading Skills",
              "startPage": 43
            },
            {
              "id": "G11-ENGL-U2-S4",
              "title": "2D Vocabulary Skills",
              "startPage": 46
            },
            {
              "id": "G11-ENGL-U2-S5",
              "title": "2E Grammar Skills",
              "startPage": 50
            },
            {
              "id": "G11-ENGL-U2-S6",
              "title": "2F Writing Skills",
              "startPage": 60
            }
          ]
        },
        {
          "id": "G11-ENGL-U3",
          "number": "3",
          "title": "Causes of Road Traffic Accidents",
          "startPage": 64,
          "endPage": 90,
          "sections": [
            {
              "id": "G11-ENGL-U3-S1",
              "title": "3A Listening Skills",
              "startPage": 64
            },
            {
              "id": "G11-ENGL-U3-S2",
              "title": "3B Speaking Skills",
              "startPage": 66
            },
            {
              "id": "G11-ENGL-U3-S3",
              "title": "3C Reading Skills",
              "startPage": 71
            },
            {
              "id": "G11-ENGL-U3-S4",
              "title": "3D Vocabulary Skills",
              "startPage": 74
            },
            {
              "id": "G11-ENGL-U3-S5",
              "title": "3E Grammar Skills",
              "startPage": 79
            },
            {
              "id": "G11-ENGL-U3-S6",
              "title": "3F Writing Skills",
              "startPage": 82
            }
          ]
        },
        {
          "id": "G11-ENGL-U4",
          "number": "4",
          "title": "People and Natural Resources",
          "startPage": 91,
          "endPage": 115,
          "sections": [
            {
              "id": "G11-ENGL-U4-S1",
              "title": "4A Listening Skills",
              "startPage": 92
            },
            {
              "id": "G11-ENGL-U4-S2",
              "title": "4B Speaking Skills",
              "startPage": 93
            },
            {
              "id": "G11-ENGL-U4-S3",
              "title": "4C Reading Skills",
              "startPage": 99
            },
            {
              "id": "G11-ENGL-U4-S4",
              "title": "4D Vocabulary Skills",
              "startPage": 102
            },
            {
              "id": "G11-ENGL-U4-S5",
              "title": "4E Grammar Skills",
              "startPage": 108
            },
            {
              "id": "G11-ENGL-U4-S6",
              "title": "4F Writing Skills",
              "startPage": 112
            }
          ]
        },
        {
          "id": "G11-ENGL-U5",
          "number": "5",
          "title": "Irrigation",
          "startPage": 116,
          "endPage": 140,
          "sections": [
            {
              "id": "G11-ENGL-U5-S1",
              "title": "5A Listening Skills",
              "startPage": 116
            },
            {
              "id": "G11-ENGL-U5-S2",
              "title": "5B Speaking Skills",
              "startPage": 118
            },
            {
              "id": "G11-ENGL-U5-S3",
              "title": "5C Reading Skills",
              "startPage": 122
            },
            {
              "id": "G11-ENGL-U5-S4",
              "title": "5D Vocabulary Skills",
              "startPage": 126
            },
            {
              "id": "G11-ENGL-U5-S5",
              "title": "5E Grammar Skills",
              "startPage": 127
            },
            {
              "id": "G11-ENGL-U5-S6",
              "title": "5F Writing Skills",
              "startPage": 132
            }
          ]
        },
        {
          "id": "G11-ENGL-U6",
          "number": "6",
          "title": "Global Warming",
          "startPage": 141,
          "endPage": 164,
          "sections": [
            {
              "id": "G11-ENGL-U6-S1",
              "title": "6A Listening Skills",
              "startPage": 142
            },
            {
              "id": "G11-ENGL-U6-S2",
              "title": "6B Speaking Skills",
              "startPage": 143
            },
            {
              "id": "G11-ENGL-U6-S3",
              "title": "6C Reading Skills",
              "startPage": 149
            },
            {
              "id": "G11-ENGL-U6-S4",
              "title": "6D Vocabulary Skills",
              "startPage": 152
            },
            {
              "id": "G11-ENGL-U6-S5",
              "title": "6E Grammar Skills",
              "startPage": 153
            },
            {
              "id": "G11-ENGL-U6-S6",
              "title": "6F Writing Skills",
              "startPage": 163
            }
          ]
        },
        {
          "id": "G11-ENGL-U7",
          "number": "7",
          "title": "Patriotism",
          "startPage": 165,
          "endPage": 203,
          "sections": [
            {
              "id": "G11-ENGL-U7-S1",
              "title": "7A Listening Skills",
              "startPage": 165
            },
            {
              "id": "G11-ENGL-U7-S2",
              "title": "7B Speaking Skills",
              "startPage": 167
            },
            {
              "id": "G11-ENGL-U7-S3",
              "title": "7C Reading Skills",
              "startPage": 172
            },
            {
              "id": "G11-ENGL-U7-S4",
              "title": "7D Vocabulary Skills",
              "startPage": 176
            },
            {
              "id": "G11-ENGL-U7-S5",
              "title": "7E Grammar Skills",
              "startPage": 179
            },
            {
              "id": "G11-ENGL-U7-S6",
              "title": "7F Writing Skills",
              "startPage": 200
            }
          ]
        },
        {
          "id": "G11-ENGL-U8",
          "number": "8",
          "title": "Efficiency of Health Services",
          "startPage": 204,
          "endPage": 224,
          "sections": [
            {
              "id": "G11-ENGL-U8-S1",
              "title": "8A Listening Skills",
              "startPage": 204
            },
            {
              "id": "G11-ENGL-U8-S2",
              "title": "8B Speaking Skills",
              "startPage": 205
            },
            {
              "id": "G11-ENGL-U8-S3",
              "title": "8C Reading Skills",
              "startPage": 207
            },
            {
              "id": "G11-ENGL-U8-S4",
              "title": "8D Vocabulary Skills",
              "startPage": 209
            },
            {
              "id": "G11-ENGL-U8-S5",
              "title": "8E Grammar Skills",
              "startPage": 210
            },
            {
              "id": "G11-ENGL-U8-S6",
              "title": "8F Writing Skills",
              "startPage": 217
            }
          ]
        },
        {
          "id": "G11-ENGL-U9",
          "number": "9",
          "title": "Indigenous Conflict Resolution",
          "startPage": 225,
          "endPage": 252,
          "sections": [
            {
              "id": "G11-ENGL-U9-S1",
              "title": "9A Listening Skills",
              "startPage": 226
            },
            {
              "id": "G11-ENGL-U9-S2",
              "title": "9B Speaking Skills",
              "startPage": 229
            },
            {
              "id": "G11-ENGL-U9-S3",
              "title": "9C Reading Skills",
              "startPage": 234
            },
            {
              "id": "G11-ENGL-U9-S4",
              "title": "9D Vocabulary Skills",
              "startPage": 238
            },
            {
              "id": "G11-ENGL-U9-S5",
              "title": "9E Grammar Skills",
              "startPage": 243
            },
            {
              "id": "G11-ENGL-U9-S6",
              "title": "9F Writing Skills",
              "startPage": 249
            }
          ]
        },
        {
          "id": "G11-ENGL-U10",
          "number": "10",
          "title": "Artificial Intelligence",
          "startPage": 253,
          "endPage": 290,
          "sections": [
            {
              "id": "G11-ENGL-U10-S1",
              "title": "10A Listening Skills",
              "startPage": 253
            },
            {
              "id": "G11-ENGL-U10-S2",
              "title": "10B Speaking Skills",
              "startPage": 256
            },
            {
              "id": "G11-ENGL-U10-S3",
              "title": "10C Reading Skills",
              "startPage": 258
            },
            {
              "id": "G11-ENGL-U10-S4",
              "title": "10D Vocabulary Skills",
              "startPage": 260
            },
            {
              "id": "G11-ENGL-U10-S5",
              "title": "10E Grammar Skills",
              "startPage": 263
            },
            {
              "id": "G11-ENGL-U10-S6",
              "title": "10F Writing Skills",
              "startPage": 269
            },
            {
              "id": "G11-ENGL-U10-S7",
              "title": "Appendix I",
              "startPage": 273
            },
            {
              "id": "G11-ENGL-U10-S8",
              "title": "Appendix II",
              "startPage": 279
            }
          ]
        }
      ]
    },
    "12": {
      "bookId": 20,
      "bookTitle": "G12-English-STB-2023-web.pdf",
      "pdfPages": 270,
      "sourceStatus": "verified-from-supplied-textbook-TOC",
      "note": "The supplied Grade 12 English TOC exposes unit titles plus six repeated skill sections per unit: listening, speaking, reading, vocabulary, grammar, and writing.",
      "units": [
        {
          "id": "G12-ENGL-U1",
          "number": "1",
          "title": "Sustainable Development",
          "startPage": 1,
          "endPage": 23,
          "sections": [
            {
              "id": "G12-ENGL-U1-S1",
              "title": "1A. Listening Skills",
              "startPage": 1,
              "endPage": 4
            },
            {
              "id": "G12-ENGL-U1-S2",
              "title": "1B. Speaking Skills",
              "startPage": 5,
              "endPage": 7
            },
            {
              "id": "G12-ENGL-U1-S3",
              "title": "1C. Reading Skills",
              "startPage": 8,
              "endPage": 13
            },
            {
              "id": "G12-ENGL-U1-S4",
              "title": "1D. Vocabulary Skills",
              "startPage": 14,
              "endPage": 15
            },
            {
              "id": "G12-ENGL-U1-S5",
              "title": "1E. Grammar Skills",
              "startPage": 16,
              "endPage": 19
            },
            {
              "id": "G12-ENGL-U1-S6",
              "title": "1F. Writing Skills",
              "startPage": 20,
              "endPage": 23
            }
          ]
        },
        {
          "id": "G12-ENGL-U2",
          "number": "2",
          "title": "Time Management",
          "startPage": 24,
          "endPage": 53,
          "sections": [
            {
              "id": "G12-ENGL-U2-S1",
              "title": "2A. Listening Skills",
              "startPage": 24,
              "endPage": 26
            },
            {
              "id": "G12-ENGL-U2-S2",
              "title": "2B. Speaking Skills",
              "startPage": 27,
              "endPage": 28
            },
            {
              "id": "G12-ENGL-U2-S3",
              "title": "2C. Reading Skills",
              "startPage": 29,
              "endPage": 35
            },
            {
              "id": "G12-ENGL-U2-S4",
              "title": "2D. Vocabulary Skills",
              "startPage": 36,
              "endPage": 39
            },
            {
              "id": "G12-ENGL-U2-S5",
              "title": "2E. Grammar Skills",
              "startPage": 40,
              "endPage": 46
            },
            {
              "id": "G12-ENGL-U2-S6",
              "title": "2F. Writing Skills",
              "startPage": 47,
              "endPage": 53
            }
          ]
        },
        {
          "id": "G12-ENGL-U3",
          "number": "3",
          "title": "Evidence on Traffic Accident",
          "startPage": 54,
          "endPage": 73,
          "sections": [
            {
              "id": "G12-ENGL-U3-S1",
              "title": "3A. Listening Skills",
              "startPage": 54,
              "endPage": 57
            },
            {
              "id": "G12-ENGL-U3-S2",
              "title": "3B. Speaking Skills",
              "startPage": 58,
              "endPage": 58
            },
            {
              "id": "G12-ENGL-U3-S3",
              "title": "3C. Reading Skills",
              "startPage": 59,
              "endPage": 64
            },
            {
              "id": "G12-ENGL-U3-S4",
              "title": "3D. Vocabulary Skills",
              "startPage": 65,
              "endPage": 65
            },
            {
              "id": "G12-ENGL-U3-S5",
              "title": "3E. Grammar Skills",
              "startPage": 66,
              "endPage": 69
            },
            {
              "id": "G12-ENGL-U3-S6",
              "title": "3F. Writing Skills: Narrative Essay",
              "startPage": 70,
              "endPage": 73
            }
          ]
        },
        {
          "id": "G12-ENGL-U4",
          "number": "4",
          "title": "Natural Resource Management",
          "startPage": 74,
          "endPage": 102,
          "sections": [
            {
              "id": "G12-ENGL-U4-S1",
              "title": "4A. Listening Skills",
              "startPage": 74,
              "endPage": 76
            },
            {
              "id": "G12-ENGL-U4-S2",
              "title": "4B. Speaking Skills",
              "startPage": 77,
              "endPage": 83
            },
            {
              "id": "G12-ENGL-U4-S3",
              "title": "4C. Reading Skills",
              "startPage": 84,
              "endPage": 89
            },
            {
              "id": "G12-ENGL-U4-S4",
              "title": "4D. Vocabulary Skills",
              "startPage": 90,
              "endPage": 92
            },
            {
              "id": "G12-ENGL-U4-S5",
              "title": "4E. Grammar Skills",
              "startPage": 93,
              "endPage": 95
            },
            {
              "id": "G12-ENGL-U4-S6",
              "title": "4F. Writing Skills",
              "startPage": 96,
              "endPage": 102
            }
          ]
        },
        {
          "id": "G12-ENGL-U5",
          "number": "5",
          "title": "Mechanized Agriculture",
          "startPage": 103,
          "endPage": 127,
          "sections": [
            {
              "id": "G12-ENGL-U5-S1",
              "title": "5A. Listening Skills",
              "startPage": 103,
              "endPage": 106
            },
            {
              "id": "G12-ENGL-U5-S2",
              "title": "5B. Speaking Skills",
              "startPage": 107,
              "endPage": 108
            },
            {
              "id": "G12-ENGL-U5-S3",
              "title": "5C. Reading Skills",
              "startPage": 109,
              "endPage": 114
            },
            {
              "id": "G12-ENGL-U5-S4",
              "title": "5D. Vocabulary Skills",
              "startPage": 115,
              "endPage": 116
            },
            {
              "id": "G12-ENGL-U5-S5",
              "title": "5E. Grammar Skills",
              "startPage": 117,
              "endPage": 122
            },
            {
              "id": "G12-ENGL-U5-S6",
              "title": "5F. Writing Skills",
              "startPage": 123,
              "endPage": 127
            }
          ]
        },
        {
          "id": "G12-ENGL-U6",
          "number": "6",
          "title": "Green Economies",
          "startPage": 128,
          "endPage": 157,
          "sections": [
            {
              "id": "G12-ENGL-U6-S1",
              "title": "6A. Listening Skills",
              "startPage": 128,
              "endPage": 132
            },
            {
              "id": "G12-ENGL-U6-S2",
              "title": "6B. Speaking Skills",
              "startPage": 133,
              "endPage": 138
            },
            {
              "id": "G12-ENGL-U6-S3",
              "title": "6C. Reading Skills",
              "startPage": 139,
              "endPage": 145
            },
            {
              "id": "G12-ENGL-U6-S4",
              "title": "6D. Vocabulary Skills",
              "startPage": 146,
              "endPage": 148
            },
            {
              "id": "G12-ENGL-U6-S5",
              "title": "6E. Grammar Skills",
              "startPage": 149,
              "endPage": 150
            },
            {
              "id": "G12-ENGL-U6-S6",
              "title": "6F. Writing Skills",
              "startPage": 151,
              "endPage": 157
            }
          ]
        },
        {
          "id": "G12-ENGL-U7",
          "number": "7",
          "title": "National Pride",
          "startPage": 158,
          "endPage": 179,
          "sections": [
            {
              "id": "G12-ENGL-U7-S1",
              "title": "7A. Listening Skills",
              "startPage": 158,
              "endPage": 161
            },
            {
              "id": "G12-ENGL-U7-S2",
              "title": "7B. Speaking Skills",
              "startPage": 162,
              "endPage": 163
            },
            {
              "id": "G12-ENGL-U7-S3",
              "title": "7C. Reading Skills",
              "startPage": 164,
              "endPage": 169
            },
            {
              "id": "G12-ENGL-U7-S4",
              "title": "7D. Vocabulary Skills",
              "startPage": 170,
              "endPage": 171
            },
            {
              "id": "G12-ENGL-U7-S5",
              "title": "7E. Grammar Skills",
              "startPage": 172,
              "endPage": 176
            },
            {
              "id": "G12-ENGL-U7-S6",
              "title": "7F. Writing Skills",
              "startPage": 177,
              "endPage": 179
            }
          ]
        },
        {
          "id": "G12-ENGL-U8",
          "number": "8",
          "title": "Telemedicine",
          "startPage": 180,
          "endPage": 214,
          "sections": [
            {
              "id": "G12-ENGL-U8-S1",
              "title": "8A. Listening Skills",
              "startPage": 180,
              "endPage": 182
            },
            {
              "id": "G12-ENGL-U8-S2",
              "title": "8B. Speaking Skills",
              "startPage": 183,
              "endPage": 188
            },
            {
              "id": "G12-ENGL-U8-S3",
              "title": "8C. Reading Skills",
              "startPage": 189,
              "endPage": 197
            },
            {
              "id": "G12-ENGL-U8-S4",
              "title": "8D. Vocabulary Skills",
              "startPage": 198,
              "endPage": 203
            },
            {
              "id": "G12-ENGL-U8-S5",
              "title": "8E. Grammar Skills",
              "startPage": 204,
              "endPage": 211
            },
            {
              "id": "G12-ENGL-U8-S6",
              "title": "8F. Writing Skills",
              "startPage": 212,
              "endPage": 214
            }
          ]
        },
        {
          "id": "G12-ENGL-U9",
          "number": "9",
          "title": "Conflict Management",
          "startPage": 215,
          "endPage": 242,
          "sections": [
            {
              "id": "G12-ENGL-U9-S1",
              "title": "9A. Listening Skills",
              "startPage": 215,
              "endPage": 218
            },
            {
              "id": "G12-ENGL-U9-S2",
              "title": "9B. Speaking Skills",
              "startPage": 219,
              "endPage": 221
            },
            {
              "id": "G12-ENGL-U9-S3",
              "title": "9C. Reading Skills",
              "startPage": 222,
              "endPage": 225
            },
            {
              "id": "G12-ENGL-U9-S4",
              "title": "9D. Vocabulary Skills",
              "startPage": 226,
              "endPage": 227
            },
            {
              "id": "G12-ENGL-U9-S5",
              "title": "9E. Grammar Skills",
              "startPage": 228,
              "endPage": 233
            },
            {
              "id": "G12-ENGL-U9-S6",
              "title": "9F. Writing Skills",
              "startPage": 234,
              "endPage": 242
            }
          ]
        },
        {
          "id": "G12-ENGL-U10",
          "number": "10",
          "title": "Robotics",
          "startPage": 243,
          "endPage": 270,
          "sections": [
            {
              "id": "G12-ENGL-U10-S1",
              "title": "10A. Listening Skills",
              "startPage": 243,
              "endPage": 245
            },
            {
              "id": "G12-ENGL-U10-S2",
              "title": "10B. Speaking Skills",
              "startPage": 246,
              "endPage": 246
            },
            {
              "id": "G12-ENGL-U10-S3",
              "title": "10C. Reading Skills",
              "startPage": 247,
              "endPage": 251
            },
            {
              "id": "G12-ENGL-U10-S4",
              "title": "10D. Vocabulary Skills",
              "startPage": 252,
              "endPage": 254
            },
            {
              "id": "G12-ENGL-U10-S5",
              "title": "10E. Grammar Skills",
              "startPage": 255,
              "endPage": 258
            },
            {
              "id": "G12-ENGL-U10-S6",
              "title": "10F. Writing Skills",
              "startPage": 259,
              "endPage": 270
            }
          ]
        }
      ]
    }
  }
};

const RELATIONS = [
  {
    "sourceSubject": "Mathematics",
    "sourceGrade": 9,
    "sourceUnitContains": "Vectors",
    "targetSubject": "Physics",
    "targetGrade": 10,
    "targetUnitContains": "Vector Quantities",
    "relationship": "Cross-subject continuation",
    "reason": "Grade 9 Mathematics develops vector representation and operations; the analyzed map connects this to Grade 10 Physics Unit 1."
  },
  {
    "sourceSubject": "Mathematics",
    "sourceGrade": 9,
    "sourceUnitContains": "Trigonometry",
    "targetSubject": "Physics",
    "targetGrade": 10,
    "targetUnitContains": "Vector Quantities",
    "relationship": "Mathematical prerequisite",
    "reason": "The analyzed map identifies sine, cosine and tangent from Grade 9 Mathematics as underlying vector component resolution."
  },
  {
    "sourceSubject": "Physics",
    "sourceGrade": 9,
    "sourceUnitContains": "Physical Quantities",
    "targetSubject": "Chemistry",
    "targetGrade": 9,
    "targetUnitContains": "Measurements and Units",
    "relationship": "Horizontal alignment",
    "reason": "Both analyzed maps cover SI units, prefixes, scientific notation and measurement conventions at Grade 9."
  },
  {
    "sourceSubject": "Chemistry",
    "sourceGrade": 9,
    "sourceUnitContains": "Measurements and Units",
    "targetSubject": "Physics",
    "targetGrade": 9,
    "targetUnitContains": "Physical Quantities",
    "relationship": "Horizontal alignment",
    "reason": "The analyzed map links Chemistry Unit 2 with Physics Unit 2 around SI units, prefixes and measurement."
  },
  {
    "sourceSubject": "English",
    "sourceGrade": 10,
    "sourceUnitContains": "The Healing Power of Plants",
    "targetSubject": "Biology",
    "targetGrade": 10,
    "targetUnitContains": "Plants",
    "relationship": "Cross-subject connection",
    "reason": "The analyzed map explicitly connects English Unit 8, The Healing Power of Plants, with Biology Unit 2: Plants."
  }
];

function withRanges(unit) {
  const sections = (unit.sections || [])
    .map((rawSection, index, arr) => {
      // English sections are generic ("Grammar"); attach the source-backed
      // sub-headings the textbook prints inside them (see englishDetails.js).
      const section = ENGLISH_DETAILS[rawSection.id] ? { ...rawSection, details: ENGLISH_DETAILS[rawSection.id] } : rawSection
      const start = Number(section.startPage)
      if (!Number.isFinite(start)) {
        return { ...section, endPage: section.endPage ?? null, rangeBasis: 'no-page-anchor' }
      }
      const later = arr
        .slice(index + 1)
        .map(s => Number(s.startPage))
        .filter(Number.isFinite)
        .find(p => p > start)
      const endPage = Number.isFinite(Number(section.endPage))
        ? Number(section.endPage)
        : (later ? Math.min(Number(unit.endPage), later - 1) : Number(unit.endPage))
      return {
        ...section,
        endPage: Number.isFinite(endPage) ? endPage : null,
        rangeBasis: later ? 'between-mapped-section-starts' : 'unit-end'
      }
    })
  return { ...unit, sections }
}

function normalizeSubject(name) {
  const value = String(name || '').trim().toLowerCase()
  const aliases = {
    math: 'Mathematics', maths: 'Mathematics', mathematics: 'Mathematics',
    physics: 'Physics', chemistry: 'Chemistry', biology: 'Biology', english: 'English'
  }
  return aliases[value] || String(name || '').trim()
}

function findGradeData(subjectName, grade) {
  const subject = normalizeSubject(subjectName)
  return MAP[subject]?.[String(Number(grade))] || null
}

export function getCurriculumForSubject(subjectName) {
  const subject = normalizeSubject(subjectName)
  const grades = MAP[subject] || {}
  return Object.fromEntries(
    Object.entries(grades).map(([grade, data]) => [
      Number(grade),
      {
        ...data,
        grade: Number(grade),
        units: (data.units || []).map(withRanges)
      }
    ])
  )
}

export function getCurriculumGrades(subjectName) {
  return Object.keys(getCurriculumForSubject(subjectName))
    .map(Number).filter(Number.isFinite).sort((a, b) => a - b)
}

export function findCurriculumTopic(subjectName, grade, options = {}) {
  const data = findGradeData(subjectName, grade)
  if (!data) return null
  const units = (data.units || []).map(withRanges)
  const unitId = options.unitId || options.chapterId || null
  const sectionId = options.sectionId || null
  const unitTitle = String(options.unitTitle || options.chapterTitle || '').trim().toLowerCase()
  const sectionTitle = String(options.sectionTitle || '').trim().toLowerCase()

  let unit = unitId ? units.find(u => String(u.id) === String(unitId)) : null
  if (!unit && unitTitle) unit = units.find(u => String(u.title || '').trim().toLowerCase() === unitTitle)
  if (!unit) unit = units[0] || null
  if (!unit) return null

  let section = sectionId
    ? (unit.sections || []).find(s => String(s.id) === String(sectionId))
    : null
  if (!section && sectionTitle) {
    section = (unit.sections || []).find(s => String(s.title || '').trim().toLowerCase() === sectionTitle)
  }

  return {
    subject: normalizeSubject(subjectName),
    grade: Number(grade),
    bookId: data.bookId,
    bookTitle: data.bookTitle,
    pdfPages: data.pdfPages,
    sourceStatus: data.sourceStatus,
    unit,
    section,
    startPage: section?.startPage ?? unit.startPage ?? null,
    endPage: section?.endPage ?? unit.endPage ?? null,
    knowledgeBookId: data.bookId
  }
}

function resolveTarget(relation) {
  const gradeData = findGradeData(relation.targetSubject, relation.targetGrade)
  if (!gradeData) return null
  const unit = (gradeData.units || []).map(withRanges)
    .find(u => String(u.title || '').toLowerCase().includes(String(relation.targetUnitContains || '').toLowerCase()))
  if (!unit) return null
  return { gradeData, unit }
}

const RELATED_STOPWORDS = new Set([
  'a','an','and','the','of','to','in','on','for','from','by','with','as','at','into','is','are','be','this','that',
  'unit','section','topic','grade','general','introduction','study','chapter','human','systems','importance','society','branch','renowned','common','types','definition','definitions','examples','mathematics','maths','math','physics','chemistry','biology','english'
])

const RELATED_CONCEPTS = [
  { name: 'evolution', terms: ['evolution','selection','darwin','lamarck','species','mutation','adaptation','drift','extinction','anthropolog'] },
  { name: 'genetics', terms: ['genetic','heredit','gene','chromosome','dna','mutation','allele','genotype','phenotype'] },
  { name: 'ecology', terms: ['ecology','ecosystem','population','community','environment','conservation','biodiversity','habitat'] },
  { name: 'taxonomy', terms: ['classification','taxonomy','kingdom','phylum','genus','species'] },
  { name: 'cell', terms: ['cell','cellular','membrane','organelle','mitosis','meiosis','photosynthesis','respiration'] },
  { name: 'plants', terms: ['plant','plants','botany','photosynthesis','flower','seed'] },
  { name: 'human-body', terms: ['body','organ','digest','respirat','circulat','nervous','endocrine','homeostasis'] },
  { name: 'chemistry', terms: ['matter','atom','molecule','element','compound','reaction','acid','base','solution','equilibrium'] },
  { name: 'physics', terms: ['energy','work','power','force','motion','momentum','kinematic','dynamics','mechanic','electric','charge','field','wave','optics'] },
  { name: 'vectors', terms: ['vector','scalar','velocity','acceleration','displacement','component','magnitude'] },
  { name: 'mathematics', terms: ['algebra','equation','function','polynomial','sequence','series','number','matrix','determinant','vector','trigonometry'] },
  { name: 'geometry', terms: ['geometry','shape','angle','circle','triangle','polygon','similarity','congruence','coordinate'] },
  { name: 'statistics', terms: ['statistics','probability','data','graph','distribution','mean','median','variance'] },
  { name: 'english', terms: ['grammar','vocabulary','reading','writing','listening','speaking','language','pronunciation','literature'] }
]

const RELATED_CONCEPT_ALLOWED_SUBJECTS = {
  evolution: new Set(['Biology']),
  genetics: new Set(['Biology']),
  ecology: new Set(['Biology']),
  taxonomy: new Set(['Biology']),
  cell: new Set(['Biology','Chemistry']),
  plants: new Set(['Biology','Chemistry']),
  'human-body': new Set(['Biology']),
  chemistry: new Set(['Chemistry','Physics']),
  physics: new Set(['Physics','Chemistry']),
  vectors: new Set(['Mathematics','Physics']),
  mathematics: new Set(['Mathematics','Physics']),
  geometry: new Set(['Mathematics','Physics']),
  statistics: new Set(['Mathematics','Biology']),
  english: new Set(['English'])
}

const RELATED_CONCEPT_BRIDGES = {
  evolution: { genetics: 8, ecology: 6, taxonomy: 5 },
  genetics: { evolution: 8, cell: 6 },
  ecology: { evolution: 6, plants: 6, taxonomy: 4 },
  taxonomy: { evolution: 5, ecology: 4 },
  cell: { genetics: 6, plants: 4, chemistry: 5 },
  plants: { ecology: 6, cell: 4, chemistry: 4 },
  'human-body': { cell: 4, ecology: 3, genetics: 3 },
  chemistry: { physics: 6, mathematics: 4, cell: 5, plants: 4 },
  physics: { vectors: 8, mathematics: 6, chemistry: 5 },
  vectors: { physics: 8, mathematics: 8 },
  mathematics: { vectors: 8, physics: 6, statistics: 6, geometry: 5 },
  geometry: { mathematics: 5, vectors: 4 },
  statistics: { mathematics: 6, ecology: 3 },
  english: {}
}


function relatedTokenize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(/\s+/)
    .map(t => t.replace(/(?:ing|ed|es|s)$/i, ''))
    .filter(t => t.length >= 3 && !RELATED_STOPWORDS.has(t) && !/^\d+$/.test(t))
}

function relatedConcepts(tokens) {
  const out = new Set()
  for (const concept of RELATED_CONCEPTS) {
    if (concept.terms.some(term => tokens.some(token => token.startsWith(term)))) {
      out.add(concept.name)
    }
  }
  return out
}


function buildRelatedCorpus() {
  const rows = []
  for (const [subjectName, grades] of Object.entries(MAP)) {
    for (const [gradeKey, data] of Object.entries(grades || {})) {
      const grade = Number(gradeKey)
      for (const rawUnit of data.units || []) {
        const unit = withRanges(rawUnit)
        const sections = unit.sections || []
        if (!sections.length) {
          const text = `${subjectName} ${grade} ${unit.title}`
          rows.push({
            subject: subjectName,
            grade,
            unit,
            section: null,
            text,
            tokens: relatedTokenize(text),
            concepts: relatedConcepts(relatedTokenize(text))
          })
          continue
        }
        for (const section of sections) {
          const text = `${subjectName} ${grade} ${unit.title} ${section.title}`
          const tokens = relatedTokenize(text)
          rows.push({
            subject: subjectName,
            grade,
            unit,
            section,
            text,
            tokens,
            concepts: relatedConcepts(tokens)
          })
        }
      }
    }
  }
  return rows
}

let RELATED_CORPUS_CACHE = null
let RELATED_IDF_CACHE = null
function getRelatedCorpus() {
  if (RELATED_CORPUS_CACHE) return RELATED_CORPUS_CACHE
  RELATED_CORPUS_CACHE = buildRelatedCorpus()
  const df = new Map()
  for (const row of RELATED_CORPUS_CACHE) {
    for (const token of new Set(row.tokens)) df.set(token, (df.get(token) || 0) + 1)
  }
  const total = RELATED_CORPUS_CACHE.length || 1
  RELATED_IDF_CACHE = new Map([...df.entries()].map(([token, count]) => [token, Math.log((total + 1) / (count + 1)) + 1]))
  return RELATED_CORPUS_CACHE
}

function relatedScore(source, candidate) {
  const sourceSet = new Set(source.tokens)
  const candidateSet = new Set(candidate.tokens)
  let lexical = 0
  let shared = 0
  for (const token of sourceSet) {
    if (candidateSet.has(token)) {
      shared += 1
      lexical += RELATED_IDF_CACHE?.get(token) || 1
    }
  }
  const union = new Set([...sourceSet, ...candidateSet]).size || 1
  const lexicalScore = lexical / Math.sqrt(sourceSet.size * candidateSet.size || 1)
  const jaccard = shared / union
  const sharedConcepts = [...source.concepts].filter(c => candidate.concepts.has(c))
  const bridgeMatches = []
  for (const sourceConcept of source.concepts) {
    for (const candidateConcept of candidate.concepts) {
      const weight = RELATED_CONCEPT_BRIDGES[sourceConcept]?.[candidateConcept] || 0
      const allowedSubjects = RELATED_CONCEPT_ALLOWED_SUBJECTS[candidateConcept]
      if (weight > 0 && (!allowedSubjects || allowedSubjects.has(candidate.subject))) bridgeMatches.push(weight)
    }
  }
  const bridgeScore = bridgeMatches.length ? Math.max(...bridgeMatches) : 0

  const exactConceptWeights = {
    evolution: 10,
    genetics: 9,
    ecology: 8,
    taxonomy: 7,
    cell: 7,
    plants: 6,
    chemistry: 6,
    physics: 6,
    vectors: 7,
    mathematics: 6,
    geometry: 5,
    statistics: 5,
    'human-body': 3,
    english: 4
  }
  const exactConceptScore = sharedConcepts.reduce((sum, concept) => sum + (exactConceptWeights[concept] || 3), 0)
  let score = lexicalScore * 6 + jaccard * 4 + exactConceptScore
  const hasDirectEvidence = lexicalScore > 0.08 || sharedConcepts.length > 0
  if (!hasDirectEvidence && bridgeScore === 0) return 0
  if (hasDirectEvidence) {
    score += bridgeScore
    if (candidate.subject !== source.subject) score += 3
    if (candidate.grade !== source.grade) score += 2
    if (candidate.subject !== source.subject && candidate.grade !== source.grade) score += 1.5
  } else {
    // Concept bridges are intentionally weaker than direct lexical/concept evidence.
    score = bridgeScore + (candidate.subject === source.subject ? 2 : 0) + (candidate.grade !== source.grade ? 1.5 : 0)
    if (score < 3.5) return 0
  }
  if (candidate.unit.id === source.unit.id && candidate.subject === source.subject && candidate.grade === source.grade) score -= 14
  return score
}


function relatedReason(source, candidate) {
  const shared = [...source.concepts].filter(c => candidate.concepts.has(c))
  if (shared.length) {
    return `Shared mapped concepts: ${shared.join(', ')}.`
  }
  const bridges = []
  for (const sourceConcept of source.concepts) {
    for (const candidateConcept of candidate.concepts) {
      if ((RELATED_CONCEPT_BRIDGES[sourceConcept]?.[candidateConcept] || 0) > 0) {
        bridges.push(`${sourceConcept} ↔ ${candidateConcept}`)
      }
    }
  }
  if (bridges.length) {
    return `Curriculum concept bridge: ${[...new Set(bridges)].join(', ')}.`
  }
  if (candidate.subject !== source.subject && candidate.grade !== source.grade) return 'Cross-subject and cross-grade language similarity in the curriculum map.'
  if (candidate.subject !== source.subject) return 'Cross-subject language similarity in the curriculum map.'
  if (candidate.grade !== source.grade) return 'Same-subject concept continuity across a different grade level.'
  return 'Related mapped curriculum concept.'
}


export function getRelatedTopics(subjectName, grade, unitTitle, sectionId = null) {
  const g = Number(grade)
  const subject = normalizeSubject(subjectName)
  const sourceTarget = findCurriculumTopic(subject, g, { unitTitle })
  if (!sourceTarget?.unit) return []

  const sourceSection = sectionId
    ? (sourceTarget.unit.sections || []).find(s => String(s.id) === String(sectionId))
    : null
  const sourceText = `${subject} ${g} ${sourceTarget.unit.title} ${sourceSection?.title || ''}`
  const sourceTokens = relatedTokenize(sourceText)
  const sourceRow = {
    subject,
    grade: g,
    unit: sourceTarget.unit,
    section: sourceSection,
    tokens: sourceTokens,
    concepts: relatedConcepts(sourceTokens)
  }

  const results = []
  const seen = new Set()

  // Explicit source-backed relationships remain highest priority.
  for (const rel of RELATIONS) {
    const sourceMatches = rel.sourceSubject === subject &&
      Number(rel.sourceGrade) === g &&
      String(unitTitle || '').toLowerCase().includes(String(rel.sourceUnitContains || '').toLowerCase())
    if (!sourceMatches) continue
    const target = resolveTarget(rel)
    if (!target) continue
    const id = `rel-${rel.targetSubject}-${rel.targetGrade}-${target.unit.id}`
    if (seen.has(id)) continue
    seen.add(id)
    results.push({
      id,
      title: `${rel.targetSubject} • Grade ${rel.targetGrade} • Unit ${target.unit.number}: ${target.unit.title}`,
      relationship: rel.relationship,
      reason: rel.reason,
      targetSubject: rel.targetSubject,
      targetGrade: Number(rel.targetGrade),
      targetUnitId: target.unit.id,
      targetSectionId: null,
      targetStartPage: target.unit.startPage,
      targetEndPage: target.unit.endPage,
      navigable: true,
      similarityScore: 100
    })
  }

  // Rank conceptual matches across the entire curriculum corpus.
  const candidatesByUnit = new Map()
  for (const candidate of getRelatedCorpus()) {
    if (candidate.subject === subject && candidate.grade === g && candidate.unit.id === sourceTarget.unit.id) continue
    const score = relatedScore(sourceRow, candidate)
    if (score <= 3.5) continue
    const key = `${candidate.subject}|${candidate.grade}|${candidate.unit.id}`
    const existing = candidatesByUnit.get(key)
    if (!existing || score > existing.score) candidatesByUnit.set(key, { candidate, score })
  }

  const ranked = [...candidatesByUnit.values()].sort((a, b) => b.score - a.score)
  for (const { candidate, score } of ranked) {
    if (results.length >= 10) break
    const id = `similar-${candidate.subject}-${candidate.grade}-${candidate.unit.id}-${candidate.section?.id || 'unit'}`
    if (seen.has(id)) continue
    seen.add(id)
    const targetTitle = candidate.section?.title
      ? `${candidate.subject} • Grade ${candidate.grade} • ${candidate.section.title}`
      : `${candidate.subject} • Grade ${candidate.grade} • Unit ${candidate.unit.number}: ${candidate.unit.title}`
    results.push({
      id,
      title: targetTitle,
      relationship: candidate.subject !== subject && candidate.grade !== g
        ? 'Cross-subject & cross-grade'
        : candidate.subject !== subject
          ? 'Cross-subject'
          : candidate.grade !== g
            ? 'Across grades'
            : 'Related concept',
      reason: relatedReason(sourceRow, candidate),
      targetSubject: candidate.subject,
      targetGrade: Number(candidate.grade),
      targetUnitId: candidate.unit.id,
      targetSectionId: candidate.section?.id || null,
      targetStartPage: candidate.section?.startPage ?? candidate.unit.startPage,
      targetEndPage: candidate.section?.endPage ?? candidate.unit.endPage,
      navigable: true,
      similarityScore: Number(score.toFixed(2))
    })
  }



  return results.slice(0, 10)
}

export const CURRICULUM_MAP = MAP
export const CURRICULUM_RELATIONS = RELATIONS
