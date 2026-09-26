// Source-backed curriculum tree for the supplied Ethiopian textbook analysis.
// Primary source artifact: ethiopian-grade-9-10-curriculum-map.md
// This file intentionally does NOT read /chapters or /sections from the old lowdb curriculum.
// Topic end pages are derived from the next mapped section start, capped by the unit end.
// Unit ranges themselves are taken from the analyzed source map.

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
      ]
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
      ]
    }
  },
  "Physics": {
    "9": {
      "bookTitle": "Physics Grade 9 StudentTextbook Final version .pdf",
      "units": [
        {
          "id": "G9-PHY-U1",
          "number": "1",
          "title": "Physics and Human Society",
          "startPage": 1,
          "endPage": 20,
          "sections": [
            {
              "id": "G9-PHY-U1-S1",
              "title": "1.1 Definition of Science",
              "startPage": 2
            },
            {
              "id": "G9-PHY-U1-S2",
              "title": "1.2 Branches of Physics",
              "startPage": 3
            },
            {
              "id": "G9-PHY-U1-S3",
              "title": "1.3 Related Fields to Physics",
              "startPage": 4
            },
            {
              "id": "G9-PHY-U1-S4",
              "title": "1.4 Historical Issues and Contributors",
              "startPage": 5
            }
          ]
        },
        {
          "id": "G9-PHY-U2",
          "number": "2",
          "title": "Physical Quantities and Measurement",
          "startPage": 21,
          "endPage": 58,
          "sections": []
        },
        {
          "id": "G9-PHY-U4",
          "number": "4",
          "title": "Force, Work, Energy and Power",
          "startPage": 59,
          "endPage": 100,
          "endPageLabel": "100+",
          "sections": []
        }
      ]
    },
    "10": {
      "bookTitle": "G10-Physics-STB-2023-web.pdf",
      "units": [
        {
          "id": "G10-PHY-U1",
          "number": "1",
          "title": "Vector Quantities",
          "startPage": 1,
          "endPage": 20,
          "sections": [
            {
              "id": "G10-PHY-U1-S1",
              "title": "1.1 Scalars and Vectors",
              "startPage": 2
            },
            {
              "id": "G10-PHY-U1-S2",
              "title": "1.2 Vector representations",
              "startPage": 3
            },
            {
              "id": "G10-PHY-U1-S3",
              "title": "1.3 Vector addition and subtraction",
              "startPage": 6
            },
            {
              "id": "G10-PHY-U1-S4",
              "title": "1.4 Graphical method of vector addition",
              "startPage": 8
            },
            {
              "id": "G10-PHY-U1-S5",
              "title": "1.5 Vector resolution",
              "startPage": 14
            }
          ]
        },
        {
          "id": "G10-PHY-U2",
          "number": "2",
          "title": "Uniformly Accelerated Motion",
          "startPage": 21,
          "endPage": 58,
          "sections": [
            {
              "id": "G10-PHY-U2-S1",
              "title": "2.1 Position and Displacement",
              "startPage": 22
            },
            {
              "id": "G10-PHY-U2-S2",
              "title": "2.2 Average velocity and instantaneous velocity",
              "startPage": 25
            },
            {
              "id": "G10-PHY-U2-S3",
              "title": "2.3 Acceleration",
              "startPage": 30
            },
            {
              "id": "G10-PHY-U2-S4",
              "title": "2.4 Equations of motion with constant acceleration",
              "startPage": 36
            },
            {
              "id": "G10-PHY-U2-S5",
              "title": "2.5 Graphical representation of uniformly accelerated motion",
              "startPage": 42
            },
            {
              "id": "G10-PHY-U2-S6",
              "title": "2.6 Relative velocity in one dimension",
              "startPage": 50
            }
          ]
        },
        {
          "id": "G10-PHY-U4",
          "number": "4",
          "title": "Static and Current Electricity",
          "startPage": 120,
          "endPage": 136,
          "sections": [
            {
              "id": "G10-PHY-U4-S9",
              "title": "4.9 Combination of resistors in a circuit",
              "startPage": 120
            },
            {
              "id": "G10-PHY-U4-S10",
              "title": "4.10 Voltmeter and ammeter connection",
              "startPage": 128
            },
            {
              "id": "G10-PHY-U4-S11",
              "title": "4.11 Electrical safety",
              "startPage": 132
            },
            {
              "id": "G10-PHY-U4-S12",
              "title": "4.12 Electric projects",
              "startPage": 136
            }
          ]
        },
        {
          "id": "G10-PHY-U5",
          "number": "5",
          "title": "Magnetism",
          "startPage": 151,
          "endPage": 175,
          "sections": [
            {
              "id": "G10-PHY-U5-S1",
              "title": "5.1 Magnet",
              "startPage": 152
            },
            {
              "id": "G10-PHY-U5-S2",
              "title": "5.2 Magnetic Field",
              "startPage": 155
            },
            {
              "id": "G10-PHY-U5-S3",
              "title": "5.3 Earth's magnetic field and compass",
              "startPage": 159
            },
            {
              "id": "G10-PHY-U5-S4",
              "title": "5.4 Magnetic field of current-carrying conductor",
              "startPage": 162
            },
            {
              "id": "G10-PHY-U5-S5",
              "title": "5.5 Magnetic force on moving charges",
              "startPage": null
            }
          ]
        },
        {
          "id": "G10-PHY-U6",
          "number": "6",
          "title": "Electromagnetic Waves and Geometrical Optics",
          "startPage": 204,
          "endPage": 246,
          "sections": []
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
          "sections": []
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
          "sections": []
        }
      ]
    },
    "10": {
      "bookTitle": "G10-Chemistry-STB-2023-web.pdf",
      "units": [
        {
          "id": "G10-CHM-U1",
          "number": "1",
          "title": "Chemical Reactions and Stoichiometry",
          "startPage": 1,
          "endPage": 50,
          "sections": [
            {
              "id": "G10-CHM-U1-S1",
              "title": "1.1 Introduction",
              "startPage": 2
            },
            {
              "id": "G10-CHM-U1-S2",
              "title": "1.2 Chemical Equations",
              "startPage": 3
            },
            {
              "id": "G10-CHM-U1-S3",
              "title": "1.3 Types of Chemical Reactions",
              "startPage": 11
            },
            {
              "id": "G10-CHM-U1-S4",
              "title": "1.4 Oxidation and Reduction Reactions",
              "startPage": 20
            },
            {
              "id": "G10-CHM-U1-S5",
              "title": "1.5 Molecular and Formula Masses, the Mole Concept and Chemical Formulas",
              "startPage": 28
            },
            {
              "id": "G10-CHM-U1-S6",
              "title": "1.6 Stoichiometry",
              "startPage": 34
            }
          ]
        },
        {
          "id": "G10-CHM-U2",
          "number": "2",
          "title": "Solutions",
          "startPage": 51,
          "endPage": 108,
          "sections": [
            {
              "id": "G10-CHM-U2-S1",
              "title": "2.1 Heterogeneous and Homogeneous Mixtures",
              "startPage": 53
            },
            {
              "id": "G10-CHM-U2-S2",
              "title": "2.2 The Solution Process",
              "startPage": 59
            },
            {
              "id": "G10-CHM-U2-S3",
              "title": "2.3 Solubility as an Equilibrium Process",
              "startPage": 73
            },
            {
              "id": "G10-CHM-U2-S4",
              "title": "2.4 Ways of Expressing Concentration of Solution",
              "startPage": 81
            },
            {
              "id": "G10-CHM-U2-S5",
              "title": "2.5 Preparation of Solutions",
              "startPage": 94
            },
            {
              "id": "G10-CHM-U2-S6",
              "title": "2.6 Solution Stoichiometry",
              "startPage": 98
            },
            {
              "id": "G10-CHM-U2-S7",
              "title": "2.7 Describing Reactions in Solution",
              "startPage": 101
            }
          ]
        },
        {
          "id": "G10-CHM-U3",
          "number": "3",
          "title": "Important Inorganic Compounds",
          "startPage": 109,
          "endPage": 168,
          "sections": [
            {
              "id": "G10-CHM-U3-S1",
              "title": "3.1 Introduction",
              "startPage": 110
            },
            {
              "id": "G10-CHM-U3-S2",
              "title": "3.2 Oxides",
              "startPage": 111
            },
            {
              "id": "G10-CHM-U3-S3",
              "title": "3.3 Acids",
              "startPage": 122
            },
            {
              "id": "G10-CHM-U3-S4",
              "title": "3.4 Bases",
              "startPage": 140
            },
            {
              "id": "G10-CHM-U3-S5",
              "title": "3.5 Salts",
              "startPage": 148
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
          "sections": []
        },
        {
          "id": "G9-BIO-U4",
          "number": "4",
          "title": "Reproduction",
          "startPage": 74,
          "endPage": 102,
          "sections": []
        },
        {
          "id": "G9-BIO-U5",
          "number": "5",
          "title": "Human Health, Nutrition and Diseases",
          "startPage": 103,
          "endPage": 136,
          "sections": []
        },
        {
          "id": "G9-BIO-U6",
          "number": "6",
          "title": "Ecology",
          "startPage": 137,
          "endPage": 160,
          "endPageLabel": "160+",
          "sections": []
        }
      ]
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
          "sections": []
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
          "sections": []
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
      ]
    }
  },
  "English": {
    "9": {
      "bookTitle": "G9-English-STB-2023-web.pdf",
      "units": [],
      "note": "The analyzed map states that source snippets for the Grade 9 English textbook were unavailable in that analysis. No mock units are added."
    },
    "10": {
      "bookTitle": "G10-English-STB-2023-web.pdf",
      "units": [
        {
          "id": "G10-ENG-U1",
          "number": "1",
          "title": "Population Growth",
          "startPage": 1,
          "endPage": 35,
          "sections": [
            {
              "id": "G10-ENG-U1-S1",
              "title": "1.1 Listening: Population Explosion",
              "startPage": 2
            },
            {
              "id": "G10-ENG-U1-S2",
              "title": "1.2 Speaking",
              "startPage": 3
            },
            {
              "id": "G10-ENG-U1-S3",
              "title": "1.3 Reading: Population Growth",
              "startPage": 7
            },
            {
              "id": "G10-ENG-U1-S4",
              "title": "1.4 Grammar",
              "startPage": 18
            },
            {
              "id": "G10-ENG-U1-S5",
              "title": "1.5 Writing",
              "startPage": 33
            }
          ]
        },
        {
          "id": "G10-ENG-U5",
          "number": "5",
          "title": "Honey Processing",
          "startPage": 119,
          "endPage": 145,
          "sections": [
            {
              "id": "G10-ENG-U5-S1",
              "title": "5.1 Listening: Honey Processing",
              "startPage": 120
            },
            {
              "id": "G10-ENG-U5-S2",
              "title": "5.2 Speaking",
              "startPage": 122
            },
            {
              "id": "G10-ENG-U5-S3",
              "title": "5.3 Reading: The Importance of Honey",
              "startPage": 124
            },
            {
              "id": "G10-ENG-U5-S4",
              "title": "5.4 Vocabulary",
              "startPage": 128
            },
            {
              "id": "G10-ENG-U5-S5",
              "title": "5.5 Grammar",
              "startPage": 131
            },
            {
              "id": "G10-ENG-U5-S6",
              "title": "5.6 Writing",
              "startPage": 139
            }
          ]
        },
        {
          "id": "G10-ENG-U9",
          "number": "9",
          "title": "Multilingualism",
          "startPage": 243,
          "endPage": 273,
          "sections": [
            {
              "id": "G10-ENG-U9-S1",
              "title": "9.1 Listening: Multilingualism",
              "startPage": 244
            },
            {
              "id": "G10-ENG-U9-S2",
              "title": "9.2 Speaking",
              "startPage": 246
            },
            {
              "id": "G10-ENG-U9-S3",
              "title": "9.3 Reading: Cognitive Benefits of being Multilingual",
              "startPage": 247
            },
            {
              "id": "G10-ENG-U9-S4",
              "title": "9.4 Writing: Letters Writing",
              "startPage": 253
            },
            {
              "id": "G10-ENG-U9-S5",
              "title": "9.5 Grammar",
              "startPage": 256
            },
            {
              "id": "G10-ENG-U9-S6",
              "title": "9.6 Vocabulary",
              "startPage": 270
            }
          ]
        }
      ]
    }
  }
}

const RELATIONSHIPS = [
  {
    "sourceSubject": "Mathematics",
    "sourceGrade": 9,
    "unitContains": "Vectors",
    "targetTitle": "Grade 10 Physics Unit 1: Vector Quantities",
    "relationship": "Cross-subject continuation",
    "reason": "Grade 9 Mathematics Unit 7 develops vector representation and operations; the analyzed map connects this to Grade 10 Physics Unit 1."
  },
  {
    "sourceSubject": "Mathematics",
    "sourceGrade": 9,
    "unitContains": "Trigonometry",
    "targetTitle": "Grade 10 Physics Unit 1: Vector Quantities",
    "relationship": "Mathematical prerequisite",
    "reason": "The analyzed map identifies sine, cosine and tangent from Grade 9 Mathematics as underlying vector component resolution."
  },
  {
    "sourceSubject": "Physics",
    "sourceGrade": 9,
    "unitContains": "Physical Quantities and Measurement",
    "targetTitle": "Grade 9 Chemistry Unit 2: Measurements and Units in Chemistry",
    "relationship": "Horizontal alignment",
    "reason": "Both analyzed maps cover SI units, prefixes, scientific notation and measurement conventions at Grade 9."
  },
  {
    "sourceSubject": "Chemistry",
    "sourceGrade": 9,
    "unitContains": "Measurements and Units in Chemistry",
    "targetTitle": "Grade 9 Physics Unit 2: Physical Quantities and Measurement",
    "relationship": "Horizontal alignment",
    "reason": "The analyzed map links Chemistry Unit 2 with Physics Unit 2 around SI units, prefixes and measurement."
  },
  {
    "sourceSubject": "English",
    "sourceGrade": 10,
    "unitContains": "The Healing Power of Plants",
    "targetTitle": "Grade 10 Biology Unit 2: Plants",
    "relationship": "Cross-subject connection",
    "reason": "The analyzed map explicitly connects English Unit 8, The Healing Power of Plants, with Biology Unit 2: Plants."
  }
]

function withRanges(unit) {
  const sections = (unit.sections || []).map((section, index, arr) => {
    const later = arr
      .slice(index + 1)
      .find(s => Number.isFinite(s.startPage) && s.startPage > section.startPage)

    let endPage = null
    if (Number.isFinite(section.startPage)) {
      endPage = later
        ? Math.min(unit.endPage, later.startPage - 1)
        : unit.endPage
    }

    return {
      ...section,
      endPage,
      rangeBasis: later ? 'between-mapped-section-starts' : 'unit-end'
    }
  })

  return {
    ...unit,
    sections
  }
}

export function getCurriculumForSubject(subjectName) {
  const subject = String(subjectName || '').trim()
  const grades = MAP[subject] || {}

  return Object.fromEntries(
    Object.entries(grades).map(([grade, data]) => [
      Number(grade),
      {
        ...data,
        units: (data.units || []).map(withRanges)
      }
    ])
  )
}

export function getCurriculumGrades(subjectName) {
  return Object.keys(getCurriculumForSubject(subjectName))
    .map(Number)
    .sort((a, b) => a - b)
}

export function getRelatedTopics(subjectName, grade, unitTitle) {
  const result = []
  const g = Number(grade)
  const unit = String(unitTitle || '')

  for (const rel of RELATIONSHIPS) {
    const sourceMatches =
      rel.sourceSubject === subjectName &&
      Number(rel.sourceGrade) === g &&
      unit.toLowerCase().includes(
        String(rel.unitContains || '').toLowerCase()
      )

    if (sourceMatches) {
      result.push({
        id: `${rel.targetTitle}-${rel.sourceGrade}`,
        title: rel.targetTitle,
        relationship: rel.relationship,
        reason: rel.reason
      })
    }
  }

  return result
}

export const CURRICULUM_MAP = MAP
