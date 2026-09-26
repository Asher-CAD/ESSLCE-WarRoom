/*
 * ESSLCE WAR ROOM
 * REAL CURRICULUM KNOWLEDGE MAP
 *
 * IMPORTANT:
 * This file stores previously analyzed, source-grounded
 * curriculum knowledge.
 *
 * It is NOT an AI prediction.
 * It does NOT invent missing textbook sections.
 *
 * Textbook page content remains the primary source.
 */

export const KNOWLEDGE_MAP = {
  source: {
    type: 'ETHIOPIAN_MINISTRY_OF_EDUCATION_TEXTBOOKS',
    authority: 'TEXTBOOK',
    version: '2026-09',
  },

  subjects: {
    mathematics: {
      grade9: {
        book: 'Grade 9 Maths Student Textbook 2Aug22.pdf',

        units: [
          {
            number: "1'",
            title: 'Further on Sets',
            pages: '1-16',

            sections: [
              {
                number: "1'.1",
                title: 'Description of the Concept Set',
                pages: '2'
              },
              {
                number: "1'.2",
                title: 'Notion of Set',
                pages: '5'
              },
              {
                number: "1'.3",
                title: 'Operations on Sets',
                pages: '9'
              },
              {
                number: "1'.4",
                title: 'Application of Operations on Sets',
                pages: '14'
              }
            ],

            concepts: [
              'Well-defined collection of distinct objects',
              'Set notation',
              'Universal set',
              'Empty set',
              'Union',
              'Intersection',
              'Difference / Relative Complement',
              'Symmetric Difference'
            ],

            definitions: [
              {
                term: 'Set',
                meaning:
                  'A collection of well-defined distinct objects or elements.'
              },
              {
                term: 'Well-defined',
                meaning:
                  'A clear property making it possible to determine whether an object belongs to the set.'
              },
              {
                term: 'Relative Complement',
                meaning:
                  'A - B represents the elements in A that are not in B.'
              }
            ],

            laws: [
              'Law of empty set and universal set',
              'Commutative Law',
              'Associative Law'
            ],

            formulas: [
              '∅ ∩ A = ∅',
              'U ∩ A = A',
              'A ∩ B = B ∩ A',
              '(A ∩ B) ∩ C = A ∩ (B ∩ C)'
            ],

            examples: [
              'Finding relative complements such as A − B = {3, 5, 7}.'
            ],

            prerequisites: [
              'Elementary set concepts from primary grades.'
            ],

            sourcePages: [2, 5, 9, 14]
          },

          {
            number: 1,
            title: 'The Number System',
            pages: '17-86',

            sections: [
              {
                number: '1.1',
                title: 'Revision on Natural Numbers and Integers',
                pages: '18'
              },
              {
                number: '1.1.1',
                title: "Euclid's Division Lemma",
                pages: '19'
              },
              {
                number: '1.1.2',
                title: 'Prime Numbers and Composite Numbers',
                pages: '21'
              },
              {
                number: '1.2',
                title: 'Rational Numbers',
                pages: '32'
              },
              {
                number: '1.3',
                title: 'Irrational Numbers',
                pages: '39'
              },
              {
                number: '1.4',
                title: 'Real Numbers',
                pages: '48'
              },
              {
                number: '1.5',
                title: 'Applications',
                pages: '80'
              }
            ],

            concepts: [
              "Euclid's division algorithm",
              'Prime factorization',
              'Rational numbers',
              'Proper fractions',
              'Improper fractions',
              'Mixed fractions',
              'Irrational numbers',
              'Proof of irrationality of √2',
              'Real number properties',
              'Decimal approximations',
              'Significant figures',
              'Rounding',
              'Scientific notation',
              'Rationalizing denominators'
            ],

            definitions: [
              {
                term: 'Prime Number',
                meaning:
                  'A natural number greater than 1 having exactly two distinct factors, 1 and itself.'
              },
              {
                term: 'Composite Number',
                meaning:
                  'A natural number having more than two factors.'
              },
              {
                term: 'Simplest Form',
                meaning:
                  'A fraction a/b for which GCF(a,b) = 1.'
              },
              {
                term: 'Like Radicals',
                meaning:
                  'Radicals having the same index and the same radicand.'
              }
            ],

            laws: [
              "Euclid's Division Algorithm",
              'Fundamental Theorem of Arithmetic',
              'GCF-LCM relationship',
              'Laws of radicals'
            ],

            formulas: [
              'a = bq + r, where 0 ≤ r < b',
              'GCF(a,b) × LCM(a,b) = a × b',
              'a × 10^n, where 1 ≤ a < 10'
            ],

            examples: [
              'Conversion of repeating decimals to fractions.',
              'Rationalizing denominators containing binomial radicals.'
            ],

            diagrams: [
              'Euler/Venn diagram showing Natural ⊂ Integers ⊂ Rational ⊂ Real numbers.'
            ],

            assessment: [
              'Euclid division verification problems such as 736 = 12q + r.'
            ],

            sourcePages: [
              18,
              19,
              21,
              32,
              39,
              48,
              80
            ]
          },

          {
            number: 2,
            title: 'Solving Equations',
            pages: '87-129',

            sections: [
              {
                number: '2.1',
                title: 'Revision of Linear Equation in One Variable',
                pages: '88'
              },
              {
                number: '2.2',
                title: 'Systems of Linear Equations in Two Variables',
                pages: '91'
              },
              {
                number: '2.3',
                title: 'Solving Non-linear Equations',
                pages: '100'
              },
              {
                number: '2.4',
                title: 'Some Applications of Solving Equations',
                pages: '120'
              }
            ],

            concepts: [
              'Systems of linear equations',
              'Substitution method',
              'Elimination method',
              'Graphical method',
              'Quadratic equations',
              'Factorization',
              'Completing the square',
              'Quadratic formula',
              'Exponential equations'
            ],

            definitions: [
              {
                term: 'Quadratic Equation',
                meaning:
                  'An equation of the form ax² + bx + c = 0 where a, b, c are real and a ≠ 0.'
              },
              {
                term: 'Leading Coefficient',
                meaning:
                  'The non-zero real coefficient a in ax² + bx + c = 0.'
              }
            ],

            formulas: [
              'x = (-b ± √(b² - 4ac)) / 2a',
              'x₁ + x₂ = -b/a',
              'x₁ × x₂ = c/a'
            ],

            examples: [
              'Solving exponential equations by expressing both sides using a common base.'
            ],

            sourcePages: [88, 91, 100, 120]
          },

          {
            number: 3,
            title: 'Solving Inequalities',
            pages: '130-161',

            sections: [
              {
                number: '3.1',
                title: 'Revision on Linear Inequalities in One Variable',
                pages: '131'
              },
              {
                number: '3.2',
                title: 'Systems of Linear Inequalities in Two Variables',
                pages: '135'
              },
              {
                number: '3.3',
                title: 'Inequalities Involving Absolute Value',
                pages: '144'
              },
              {
                number: '3.4',
                title: 'Quadratic Inequalities',
                pages: '149'
              },
              {
                number: '3.5',
                title: 'Applications on Equations',
                pages: '153'
              }
            ],

            concepts: [
              'Linear inequalities',
              'Coordinate-plane solution regions',
              'Absolute-value inequalities',
              'Quadratic inequalities',
              'Interval signs'
            ],

            laws: [
              'Multiplying or dividing an inequality by a negative number reverses the inequality sign.'
            ],

            sourcePages: [131, 135, 144, 149, 153]
          },

          {
            number: 4,
            title: 'Introduction to Trigonometry',
            pages: '162-180',

            sections: [
              {
                number: '4.1',
                title: 'Revision on Right-angled Triangles',
                pages: '163'
              },
              {
                number: '4.2',
                title: 'The Trigonometric Ratios',
                pages: '167'
              }
            ],

            concepts: [
              'Right-angled triangles',
              'Sine',
              'Cosine',
              'Tangent'
            ],

            formulas: [
              'sin A = Opposite / Hypotenuse',
              'cos A = Adjacent / Hypotenuse',
              'tan A = Opposite / Adjacent',
              'a² + b² = c²'
            ],

            prerequisites: [
              'Right-angled triangles',
              'Pythagorean theorem'
            ],

            sourcePages: [163, 167]
          },

          {
            number: 5,
            title: 'Regular Polygons',
            pages: '181-208',

            concepts: [
              'Properties of regular polygons',
              'Interior angles',
              'Exterior angles',
              'Perimeter',
              'Area'
            ],

            sourcePages: [181, 208]
          },

          {
            number: 6,
            title: 'Congruency and Similarity',
            pages: '209-246',

            sections: [
              {
                number: '6.1',
                title: 'Revision on Congruency of Triangles',
                pages: '210'
              },
              {
                number: '6.2',
                title: 'Definition of Similar Figures',
                pages: '214'
              },
              {
                number: '6.3',
                title: 'Theorems on Similar Plane Figures',
                pages: '219'
              },
              {
                number: '6.4',
                title: 'Ratio of Perimeters of Similar Plane Figures',
                pages: '229'
              },
              {
                number: '6.5',
                title: 'Ratio of Areas of Similar Plane Figures',
                pages: '232'
              },
              {
                number: '6.6',
                title: 'Construction of Similar Plane Figures',
                pages: '236'
              },
              {
                number: '6.7',
                title: 'Applications on Similarities',
                pages: '238'
              }
            ],

            classifications: [
              'AAA',
              'SSS',
              'SAS'
            ],

            laws: [
              'The ratio of areas of two similar plane figures equals the square of their scale factor.'
            ],

            sourcePages: [
              210,
              214,
              219,
              229,
              232,
              236,
              238
            ]
          },

          {
            number: 7,
            title: 'Vectors in Two Dimensions',
            pages: '247-278',

            sections: [
              {
                number: '7.1',
                title: 'Scalar and Vector Quantities',
                pages: '248'
              },
              {
                number: '7.2',
                title: 'Representation of a Vector',
                pages: '251'
              },
              {
                number: '7.3',
                title: 'Vectors Operations',
                pages: '257'
              },
              {
                number: '7.4',
                title: 'Position Vector',
                pages: '267'
              },
              {
                number: '7.5',
                title: 'Applications of Vectors in Two Dimensions',
                pages: '272'
              }
            ],

            concepts: [
              'Scalar quantities',
              'Vector quantities',
              'Graphical representation',
              'Algebraic representation',
              'Vector addition',
              'Vector subtraction',
              'Scalar multiplication',
              'Position vectors'
            ],

            definitions: [
              {
                term: 'Scalar',
                meaning:
                  'A quantity represented by a magnitude only.'
              },
              {
                term: 'Vector',
                meaning:
                  'A quantity having both magnitude and direction.'
              }
            ],

            sourcePages: [248, 251, 257, 267, 272]
          },

          {
            number: 8,
            title: 'Statistics and Probability',
            pages: '279-328',

            sections: [
              {
                number: '8.1',
                title: 'Statistical Data',
                pages: '281'
              },
              {
                number: '8.2',
                title: 'Probability',
                pages: '313'
              }
            ],

            concepts: [
              'Statistical data',
              'Frequency distributions',
              'Histograms',
              'Pie charts',
              'Classical probability',
              'Experimental probability'
            ],

            sourcePages: [281, 313]
          }
        ]
      },

      grade10: {
        book: 'G10-Mathematics-STB-2023-web.pdf',

        units: [
          {
            number: 1,
            title: 'Relations and Functions',
            pages: '1-66',

            sections: [
              {
                number: '1.1',
                title: 'Relations',
                pages: '2'
              },
              {
                number: '1.2',
                title: 'Functions',
                pages: '17'
              },
              {
                number: '1.3',
                title: 'Applications of Relations and Functions',
                pages: '50'
              }
            ],

            concepts: [
              'Relations',
              'Domains',
              'Ranges',
              'Functions',
              'Graphs',
              'Combination of functions',
              'Linear functions',
              'Quadratic functions'
            ],

            definitions: [
              {
                term: 'Relation',
                meaning:
                  'A set of ordered pairs mapping domain values to range values.'
              },
              {
                term: 'Function',
                meaning:
                  'A relation in which each domain element maps to exactly one range element.'
              },
              {
                term: 'Graph of a function',
                meaning:
                  'The set of Cartesian coordinates (x,y) such that f(x)=y.'
              },
              {
                term: 'Linear Function',
                meaning: 'f(x) = ax + b'
              },
              {
                term: 'Quadratic Function',
                meaning: 'f(x) = ax² + bx + c, with a ≠ 0'
              }
            ],

            prerequisites: [
              'Grade 9 coordinate geometry',
              'Basic algebraic equations'
            ],

            sourcePages: [2, 17, 50]
          },

          {
            number: 2,
            title: 'Polynomial Functions',
            pages: '67-120',

            sections: [
              {
                number: '2.1',
                title: 'Definition of Polynomial Function',
                pages: '68'
              },
              {
                number: '2.2',
                title: 'Operations on Polynomial Functions',
                pages: '74'
              },
              {
                number: '2.3',
                title: 'Theorem on Polynomial Functions',
                pages: '84'
              },
              {
                number: '2.4',
                title: 'Zeros of Polynomial Functions',
                pages: '93'
              },
              {
                number: '2.5',
                title: 'Graphs of Polynomial Functions',
                pages: '101'
              },
              {
                number: '2.6',
                title: 'Applications',
                pages: '112'
              }
            ],

            concepts: [
              'Polynomial operations',
              'Polynomial division',
              'Remainder theorem',
              'Factor theorem',
              'Zeros',
              'Multiplicity',
              'Polynomial graphs'
            ],

            laws: [
              'Remainder Theorem',
              'Factor Theorem',
              'Polynomial Division Theorem'
            ],

            formulas: [
              'f(x) = d(x)q(x) + r(x)',
              'Remainder when divided by x-c is f(c)',
              'x-c is a factor iff f(c)=0'
            ],

            sourcePages: [68, 74, 84, 93, 101, 112]
          },

          {
            number: 3,
            title: 'Exponential and Logarithmic Functions',
            pages: '121-198',

            sections: [
              {
                number: '3.1',
                title: 'Exponents and Logarithms',
                pages: '122'
              },
              {
                number: '3.2',
                title: 'The Exponential Functions and Their Graphs',
                pages: '153'
              },
              {
                number: '3.3',
                title: 'The Logarithmic Functions and Their Graphs',
                pages: '163'
              },
              {
                number: '3.4',
                title: 'Solving Exponential and Logarithmic Equations',
                pages: '172'
              },
              {
                number: '3.5',
                title: 'Relation between Exponential and Logarithmic Functions',
                pages: '178'
              },
              {
                number: '3.6',
                title: 'Applications',
                pages: '182'
              }
            ],

            concepts: [
              'Exponents',
              'Logarithms',
              'Exponential functions',
              'Logarithmic functions',
              'Growth models',
              'Decay models',
              'Compound interest',
              'Radioactive decay'
            ],

            formulas: [
              'y = log_a(x) ⇔ a^y = x, where a > 0 and a ≠ 1'
            ],

            sourcePages: [122, 153, 163, 172, 178, 182]
          },

          {
            number: 4,
            title: 'Trigonometric Functions',
            pages: '199-250',

            sections: [
              {
                number: '4.1',
                title: 'Radian Measure of Angle',
                pages: '200'
              },
              {
                number: '4.2',
                title: 'Basic Trigonometric Function',
                pages: '207'
              },
              {
                number: '4.3',
                title: 'Trigonometric Identities & Equation',
                pages: '234'
              },
              {
                number: '4.4',
                title: 'Application',
                pages: '242'
              }
            ],

            concepts: [
              'Radians',
              'Degrees',
              'Coterminal angles',
              'Reference angles',
              'Unit circle',
              'Trigonometric identities',
              'Trigonometric equations'
            ],

            formulas: [
              'cos²θ + sin²θ = 1',
              '1 + tan²θ = sec²θ',
              '1 + cot²θ = csc²θ'
            ],

            sourcePages: [200, 207, 234, 242]
          },

          {
            number: 5,
            title: 'Circles',
            pages: '251-286',

            sections: [
              {
                number: '5.1',
                title: 'Symmetrical properties of circles',
                pages: '252'
              },
              {
                number: '5.2',
                title: 'Angle properties of circles',
                pages: '258'
              },
              {
                number: '5.3',
                title: 'Arc length, perimeters and areas of segments and sectors',
                pages: '268'
              },
              {
                number: '5.4',
                title:
                  'Theorems on angles and arcs determined by lines intersecting inside, on and outside a circle',
                pages: '275'
              }
            ],

            concepts: [
              'Circle symmetry',
              'Chord properties',
              'Central angles',
              'Inscribed angles',
              'Arc length',
              'Sectors',
              'Segments'
            ],

            definitions: [
              {
                term: 'Circle',
                meaning:
                  'The locus of points in a plane equidistant from a fixed center.'
              },
              {
                term: 'Central Angle',
                meaning:
                  'An angle formed by two radii with its vertex at the center.'
              },
              {
                term: 'Sector',
                meaning:
                  'A portion of a circle enclosed by two radii and an arc.'
              }
            ],

            sourcePages: [252, 258, 268, 275]
          },

          {
            number: 6,
            title: 'Solid Figures',
            pages: '287-344',

            sections: [
              {
                number: '6.1',
                title: 'Revision of Cylinders and Prisms',
                pages: '288'
              },
              {
                number: '6.2',
                title: 'Pyramids, cones and Spheres',
                pages: '294'
              },
              {
                number: '6.3',
                title: 'Frustum of pyramids and cones',
                pages: '321'
              },
              {
                number: '6.4',
                title: 'Surface areas and volumes of composed solids',
                pages: '331'
              },
              {
                number: '6.5',
                title: 'Applications',
                pages: '336'
              }
            ],

            sourcePages: [288, 294, 321, 331, 336]
          },

          {
            number: 7,
            title: 'Coordinate Geometry',
            pages: '345-380',

            sections: [
              {
                number: '7.1',
                title: 'Distance between two points',
                pages: '347'
              },
              {
                number: '7.2',
                title: 'Division of a line segment',
                pages: '351'
              },
              {
                number: '7.3',
                title: 'Equation of a line',
                pages: '356'
              },
              {
                number: '7.4',
                title: 'Slopes of parallel and perpendicular lines',
                pages: '365'
              },
              {
                number: '7.5',
                title: 'Equation of a Circle',
                pages: '370'
              },
              {
                number: '7.6',
                title: 'Applications',
                pages: '375'
              }
            ],

            concepts: [
              'Distance formula',
              'Section formula',
              'Equation of a line',
              'Slope',
              'Parallel lines',
              'Perpendicular lines',
              'Equation of a circle'
            ],

            sourcePages: [347, 351, 356, 365, 370, 375]
          }
        ]
      }
    },

    physics: {
      grade9: {
        book: 'Physics Grade 9 StudentTextbook Final version .pdf',

        units: [
          {
            number: 1,
            title: 'Physics and Human Society',
            pages: '1-20',

            sections: [
              {
                number: '1.1',
                title: 'Definition of Science',
                pages: '2'
              },
              {
                number: '1.2',
                title: 'Branches of Physics',
                pages: '3'
              },
              {
                number: '1.3',
                title: 'Related Fields to Physics',
                pages: '4'
              },
              {
                number: '1.4',
                title: 'Historical Issues and Contributors',
                pages: '5'
              }
            ],

            concepts: [
              'Physics',
              'Branches of physics',
              'Biophysics',
              'Geophysics',
              'Medical physics',
              'Mechanics',
              'Acoustics',
              'Optics',
              'Thermodynamics',
              'Electromagnetism',
              'Nuclear physics'
            ],

            sourcePages: [2, 3, 4, 5]
          },

          {
            number: 2,
            title: 'Physical Quantities and Measurement',
            pages: '21-58',

            concepts: [
              'Basic quantities',
              'Derived quantities',
              'Measurement',
              'Scientific notation',
              'Metric prefixes',
              'Significant figures',
              'SI units'
            ],

            definitions: [
              {
                term: 'Measurement',
                meaning:
                  'A quantitative description of a property requiring comparison with a defined standard unit.'
              },
              {
                term: 'Fundamental Quantity',
                meaning:
                  'A base quantity that does not depend on other quantities.'
              },
              {
                term: 'Derived Quantity',
                meaning:
                  'A physical quantity that depends on one or more fundamental quantities.'
              }
            ],

            formulas: [
              'v = distance / time',
              'ρ = mass / volume',
              'a = velocity / time',
              'F = mass × acceleration',
              'W = force × displacement',
              'P = force / area'
            ],

            basicQuantities: [
              'Length',
              'Mass',
              'Time',
              'Temperature',
              'Electric current',
              'Amount of substance',
              'Luminous intensity'
            ],

            sourcePages: [21, 22, 23, 24, 25]
          },

          {
            number: 4,
            title: 'Force, Work, Energy and Power',
            pages: '59-100+',

            concepts: [
              'Force',
              'Gravity',
              "Newton's laws of motion",
              'Work',
              'Potential energy',
              'Kinetic energy',
              'Mechanical energy',
              'Power'
            ],

            definitions: [
              {
                term: 'Dynamics',
                meaning:
                  'The branch of mechanics dealing with motion in relation to the forces causing it.'
              }
            ],

            sourcePages: [59, 100]
          }
        ]
      },

      grade10: {
        book: 'G10-Physics-STB-2023-web.pdf',

        units: [
          {
            number: 1,
            title: 'Vector Quantities',
            pages: '1-20',

            sections: [
              {
                number: '1.1',
                title: 'Scalars and Vectors',
                pages: '2'
              },
              {
                number: '1.2',
                title: 'Vector representations',
                pages: '3'
              },
              {
                number: '1.3',
                title: 'Vector addition and subtraction',
                pages: '6'
              },
              {
                number: '1.4',
                title: 'Graphical method of vector addition',
                pages: '8'
              },
              {
                number: '1.5',
                title: 'Vector resolution',
                pages: '14'
              }
            ],

            concepts: [
              'Scalars',
              'Vectors',
              'Vector representation',
              'Vector addition',
              'Vector subtraction',
              'Vector resolution'
            ],

            sourcePages: [2, 3, 6, 8, 14]
          },

          {
            number: 2,
            title: 'Uniformly Accelerated Motion',
            pages: '21-58',

            sections: [
              {
                number: '2.1',
                title: 'Position and Displacement',
                pages: '22'
              },
              {
                number: '2.2',
                title: 'Average velocity and instantaneous velocity',
                pages: '25'
              },
              {
                number: '2.3',
                title: 'Acceleration',
                pages: '30'
              },
              {
                number: '2.4',
                title: 'Equations of motion with constant acceleration',
                pages: '36'
              },
              {
                number: '2.5',
                title: 'Graphical representation of uniformly accelerated motion',
                pages: '42'
              },
              {
                number: '2.6',
                title: 'Relative velocity in one dimension',
                pages: '50'
              }
            ],

            concepts: [
              'Position',
              'Displacement',
              'Average velocity',
              'Instantaneous velocity',
              'Acceleration',
              'Constant acceleration',
              'Relative velocity'
            ],

            formulas: [
              'v_f = v_i + at',
              's = v_i t + 1/2 at²',
              'v_f² = v_i² + 2as'
            ],

            sourcePages: [22, 25, 30, 36, 42, 50]
          },

          {
            number: 6,
            title: 'Electromagnetic Waves and Geometrical Optics',
            pages: '204+',

            concepts: [
              'Reflection',
              'Refraction',
              'Plane mirrors',
              'Spherical mirrors',
              'Lenses',
              'Image formation'
            ],

            classifications: [
              'Concave mirror',
              'Convex mirror',
              'Convex lens',
              'Concave lens'
            ],

            sourcePages: [204]
          }
        ]
      }
    },

    chemistry: {
      grade9: {
        book: 'G9-Chemistry-STB-2023-web.pdf',

        units: [
          {
            number: 1,
            title: 'Chemistry and Its Importance',
            pages: '1-16',

            sections: [
              {
                number: '1.1',
                title: 'Definition and Scope of Chemistry',
                pages: '2'
              },
              {
                number: '1.2',
                title: 'Relationship between Chemistry and Other Natural Sciences',
                pages: '6'
              },
              {
                number: '1.3',
                title: 'The Role Chemistry Plays in Production and in the Society',
                pages: '8'
              },
              {
                number: '1.4',
                title: 'Some Common Chemical Industries in Ethiopia',
                pages: '12'
              }
            ],

            definitions: [
              {
                term: 'Chemistry',
                meaning:
                  'The science dealing with the properties, composition, structures and transformations of substances.'
              },
              {
                term: 'Biochemistry',
                meaning:
                  'The study of chemical processes occurring in living matter.'
              },
              {
                term: 'Geochemistry',
                meaning:
                  'The study of chemical compounds and isotopes distributed in geological environments.'
              }
            ],

            classifications: [
              'Organic chemistry',
              'Inorganic chemistry',
              'Physical chemistry',
              'Analytical chemistry',
              'Biochemistry'
            ],

            sourcePages: [2, 6, 8, 12]
          },

          {
            number: 2,
            title: 'Measurements and Units in Chemistry',
            pages: '17-50',

            sections: [
              {
                number: '2.1',
                title: 'Measurements and Units in Chemistry',
                pages: '19'
              }
            ],

            concepts: [
              'SI units',
              'Metric prefixes',
              'Dimensional analysis',
              'Accuracy',
              'Precision',
              'Significant figures',
              'Scientific notation',
              'Scientific laws',
              'Scientific theories'
            ],

            definitions: [
              {
                term: 'Accuracy',
                meaning:
                  'How closely a measured value agrees with the correct value.'
              },
              {
                term: 'Precision',
                meaning:
                  'How closely repeated measurements agree with one another.'
              },
              {
                term: 'Scientific Law',
                meaning:
                  'A generalized observation that predicts relationships in nature.'
              },
              {
                term: 'Scientific Theory',
                meaning:
                  'A logical explanation of the underlying cause of natural phenomena.'
              }
            ],

            sourcePages: [19, 35]
          },

          {
            number: 4,
            title: 'Periodic Classification of Elements',
            pages: '110-122+',

            sections: [
              {
                number: '4.2',
                title: "Mendeleev's Classification of the Elements",
                pages: '113'
              }
            ],

            concepts: [
              'Periodic classification',
              'History of the periodic table',
              "Mendeleev's classification",
              "Mendeleev's Periodic Law"
            ],

            sourcePages: [113]
          }
        ]
      },

      grade10: {
        book: 'G10-Chemistry-STB-2023-web.pdf',

        units: [
          {
            number: 1,
            title: 'Chemical Reactions and Stoichiometry',
            pages: '1-50',

            sections: [
              {
                number: '1.1',
                title: 'Introduction',
                pages: '2'
              },
              {
                number: '1.2',
                title: 'Chemical Equations',
                pages: '3'
              },
              {
                number: '1.3',
                title: 'Types of Chemical Reactions',
                pages: '11'
              },
              {
                number: '1.4',
                title: 'Oxidation and Reduction Reactions',
                pages: '20'
              },
              {
                number: '1.5',
                title:
                  'Molecular and Formula Masses, the Mole Concept and Chemical Formulas',
                pages: '28'
              },
              {
                number: '1.6',
                title: 'Stoichiometry',
                pages: '34'
              }
            ],

            concepts: [
              'Balancing chemical equations',
              'Reaction types',
              'Oxidation',
              'Reduction',
              'Oxidizing agents',
              'Reducing agents',
              'Mole concept',
              'Limiting reactant',
              'Theoretical yield',
              'Actual yield',
              'Percentage yield'
            ],

            definitions: [
              {
                term: 'Reaction Stoichiometry',
                meaning:
                  'The quantitative study of reactants and products in a chemical reaction.'
              },
              {
                term: 'Empirical Formula',
                meaning:
                  'The simplest whole-number ratio of atoms in a compound.'
              },
              {
                term: 'Molecular Formula',
                meaning:
                  'The actual number of atoms of each element in a molecule.'
              }
            ],

            formulas: [
              'Percentage Yield = (Actual Yield / Theoretical Yield) × 100%'
            ],

            sourcePages: [2, 3, 11, 20, 28, 34]
          },

          {
            number: 2,
            title: 'Solutions',
            pages: '51-108',

            sections: [
              {
                number: '2.1',
                title: 'Heterogeneous and Homogeneous Mixtures',
                pages: '53'
              },
              {
                number: '2.2',
                title: 'The Solution Process',
                pages: '59'
              },
              {
                number: '2.3',
                title: 'Solubility as an Equilibrium Process',
                pages: '73'
              },
              {
                number: '2.4',
                title: 'Ways of Expressing Concentration of Solution',
                pages: '81'
              },
              {
                number: '2.5',
                title: 'Preparation of Solutions',
                pages: '94'
              },
              {
                number: '2.6',
                title: 'Solution Stoichiometry',
                pages: '98'
              },
              {
                number: '2.7',
                title: 'Describing Reactions in Solution',
                pages: '101'
              }
            ],

            definitions: [
              {
                term: 'Molarity',
                meaning: 'Moles of solute per liter of solution.'
              },
              {
                term: 'Molality',
                meaning: 'Moles of solute per kilogram of solvent.'
              },
              {
                term: 'Mole Fraction',
                meaning:
                  'Ratio of moles of one component to total moles in solution.'
              }
            ],

            sourcePages: [53, 59, 73, 81, 94, 98, 101]
          },

          {
            number: 3,
            title: 'Important Inorganic Compounds',
            pages: '109-168',

            sections: [
              {
                number: '3.1',
                title: 'Introduction',
                pages: '110'
              },
              {
                number: '3.2',
                title: 'Oxides',
                pages: '111'
              },
              {
                number: '3.3',
                title: 'Acids',
                pages: '122'
              },
              {
                number: '3.4',
                title: 'Bases',
                pages: '140'
              },
              {
                number: '3.5',
                title: 'Salts',
                pages: '148'
              }
            ],

            concepts: [
              'Acidic oxides',
              'Basic oxides',
              'Amphoteric oxides',
              'Neutral oxides',
              'Arrhenius concept of acids and bases',
              'Strength versus concentration'
            ],

            sourcePages: [110, 111, 122, 140, 148]
          }
        ]
      }
    },

    biology: {
      grade9: {
        book: 'Biology Grade 9 Students TextBook Final Revised.pdf',

        units: [
          {
            number: 1,
            title: 'Introduction to Biology',
            pages: '1-18',

            sections: [
              {
                number: '1.1',
                title: 'Definition of Biology',
                pages: '2'
              },
              {
                number: '1.2',
                title: 'Why do we study Biology?',
                pages: '3'
              },
              {
                number: '1.3',
                title: 'The scientific method',
                pages: '5'
              },
              {
                number: '1.4',
                title: 'Tools of a Biologist',
                pages: '8'
              },
              {
                number: '1.5',
                title: 'Handling and using of light Microscope',
                pages: '12'
              },
              {
                number: '1.6',
                title: 'General Laboratory Safety Rules',
                pages: '16'
              }
            ],

            concepts: [
              'Biology',
              'Scientific method',
              'Biological laboratory tools',
              'Field tools',
              'Light microscope',
              'Laboratory safety'
            ],

            practicalActivities: [
              'Identifying laboratory tools',
              'Slide preparation',
              'Light microscope total magnification calculation'
            ],

            sourcePages: [2, 3, 5, 8, 12, 16]
          },

          {
            number: 2,
            title: 'Characteristics and Classification of Organisms',
            pages: '19-43',

            sections: [
              {
                number: '2.1',
                title: 'Principles of classification',
                pages: '21'
              },
              {
                number: '2.2.2',
                title: 'Taxonomic hierarchies in biological classification',
                pages: '21'
              },
              {
                number: '2.7',
                title: 'Renowned Taxonomists in Ethiopia',
                pages: '39'
              }
            ],

            concepts: [
              'Classification',
              'Taxonomy',
              'Taxonomic hierarchy',
              'Binomial nomenclature'
            ],

            historicalContent: [
              "Aristotle's morphological classification",
              "Linnaeus's taxonomic hierarchy and binomial nomenclature"
            ],

            EthiopianScientists: [
              'Prof. Sebsebe Demissew'
            ],

            sourcePages: [21, 39]
          },

          {
            number: 3,
            title: 'Cells',
            pages: '44-73'
          },

          {
            number: 4,
            title: 'Reproduction',
            pages: '74-102',

            concepts: [
              'Asexual reproduction',
              'Sexual reproduction',
              'Reproduction in bacteria',
              'Reproduction in fungi',
              'Reproduction in plants',
              'Reproduction in animals',
              'Puberty'
            ],

            definitions: [
              {
                term: 'Primary sexual characteristics',
                meaning:
                  'Organs directly involved in reproduction.'
              },
              {
                term: 'Secondary sexual characteristics',
                meaning:
                  'Non-reproductive traits emerging during puberty.'
              }
            ],

            sourcePages: [74, 102]
          },

          {
            number: 5,
            title: 'Human Health, Nutrition and Diseases',
            pages: '103-136'
          },

          {
            number: 6,
            title: 'Ecology',
            pages: '137-160+'
          }
        ]
      },

      grade10: {
        book: 'G10-Biology-STB-2023-web.pdf',

        units: [
          {
            number: 1,
            title: 'Sub-fields of Biology',
            pages: '1-22',

            concepts: [
              'Pure biology',
              'Applied biology',
              'Historical milestones'
            ],

            EthiopianScientists: [
              'Dr. Aklilu Lemma'
            ],

            sourcePages: [1, 22]
          },

          {
            number: 2,
            title: 'Plants',
            pages: '23-60',

            concepts: [
              'Internal structure of a leaf',
              'Leaf tissues',
              'Seed germination',
              'Epigeal germination',
              'Hypogeal germination'
            ],

            classifications: [
              'Epidermis',
              'Cuticle',
              'Guard cells',
              'Stomata',
              'Palisade layer',
              'Spongy layer'
            ],

            sourcePages: [22, 32]
          },

          {
            number: 4,
            title: 'Cell Reproduction',
            pages: '70-93',

            concepts: [
              'Interphase',
              'Mitosis',
              'Meiosis',
              'Somatic cell division',
              'Reduction division'
            ],

            sourcePages: [70, 92]
          },

          {
            number: 5,
            title: 'Human Biology',
            pages: '94-150',

            sections: [
              {
                number: '5.1',
                title: 'Digestive system',
                pages: '94'
              },
              {
                number: '5.2',
                title: 'Circulatory and Lymphatic systems',
                pages: '94'
              },
              {
                number: '5.2.1',
                title: 'Blood donation',
                pages: '94'
              },
              {
                number: '5.2.2',
                title:
                  'Diseases of the circulatory and lymphatic systems',
                pages: '94'
              },
              {
                number: '5.3',
                title: 'Breathing system',
                pages: '94'
              },
              {
                number: '5.4',
                title: 'Excretory system',
                pages: '94'
              },
              {
                number: '5.5',
                title: 'The immune system',
                pages: '94'
              },
              {
                number: '5.6',
                title: 'Renowned Physicians in Ethiopia',
                pages: '94'
              }
            ],

            concepts: [
              'Human organ systems',
              'Immune system',
              'Antigens',
              'Antibodies',
              'Hormones',
              'Heart sounds'
            ],

            diagnostics: [
              {
                sound: 'Lub',
                cause: 'Closing of atrioventricular valves.'
              },
              {
                sound: 'Dup',
                cause: 'Closing of semilunar valves.'
              }
            ],

            sourcePages: [94, 150]
          }
        ]
      }
    },

    english: {
      grade10: {
        book: 'G10-English-STB-2023-web.pdf',

        units: [
          {
            number: 1,
            title: 'Population Growth',
            pages: '1-35',

            sections: [
              {
                number: '1.1',
                title: 'Listening: Population Explosion',
                pages: '2'
              },
              {
                number: '1.2',
                title: 'Speaking',
                pages: '3'
              },
              {
                number: '1.3',
                title: 'Reading: Population Growth',
                pages: '7'
              },
              {
                number: '1.4',
                title: 'Grammar',
                pages: '18'
              },
              {
                number: '1.5',
                title: 'Writing',
                pages: '33'
              }
            ],

            sourcePages: [2, 3, 7, 18, 33]
          },

          {
            number: 5,
            title: 'Honey Processing',
            pages: '119-145',

            sections: [
              {
                number: '5.1',
                title: 'Listening: Honey Processing',
                pages: '120'
              },
              {
                number: '5.2',
                title: 'Speaking',
                pages: '122'
              },
              {
                number: '5.3',
                title: 'Reading: The Importance of Honey',
                pages: '124'
              },
              {
                number: '5.4',
                title: 'Vocabulary',
                pages: '128'
              },
              {
                number: '5.5',
                title: 'Grammar',
                pages: '131'
              },
              {
                number: '5.6',
                title: 'Writing',
                pages: '139'
              }
            ],

            sourcePages: [120, 122, 124, 128, 131, 139]
          },

          {
            number: 9,
            title: 'Multilingualism',
            pages: '243-273',

            sections: [
              {
                number: '9.1',
                title: 'Listening: Multilingualism',
                pages: '244'
              },
              {
                number: '9.2',
                title: 'Speaking',
                pages: '246'
              },
              {
                number: '9.3',
                title:
                  'Reading: Cognitive Benefits of being Multilingual',
                pages: '247'
              },
              {
                number: '9.4',
                title: 'Writing: Letters Writing',
                pages: '253'
              },
              {
                number: '9.5',
                title: 'Grammar',
                pages: '256'
              },
              {
                number: '9.6',
                title: 'Vocabulary',
                pages: '270'
              }
            ],

            sourcePages: [244, 246, 247, 253, 256, 270]
          }
        ]
      }
    }
  },

  crossSubjectRelationships: [
    {
      from: 'Mathematics Grade 9 Unit 7',
      to: 'Physics Grade 10 Unit 1',
      relationship: 'VECTOR FOUNDATION'
    },

    {
      from: 'Physics Grade 9 Unit 2',
      to: 'Chemistry Grade 9 Unit 2',
      relationship: 'MEASUREMENT_AND_SI_UNITS'
    },

    {
      from: 'Biology Grade 9 Unit 1',
      to: 'Chemistry Grade 9 Unit 2',
      relationship: 'SCIENTIFIC_METHOD'
    },

    {
      from: 'Physics Grade 9 Unit 1',
      to: 'Chemistry Grade 9 Unit 2',
      relationship: 'SCIENCE_LAWS_AND_THEORIES'
    },

    {
      from: 'Chemistry Grade 9 Unit 1',
      to: 'Biology Grade 10 Unit 2',
      relationship: 'BIOCHEMISTRY'
    },

    {
      from: 'English Grade 10 Unit 8',
      to: 'Biology Grade 10 Unit 2',
      relationship: 'PLANTS_AND_ETHNOBOTANY'
    }
  ]
}

/*
 * ============================================================
 * LOOKUP FUNCTIONS
 * ============================================================
 */

export function getSubject(subjectId) {
  return KNOWLEDGE_MAP.subjects[subjectId] || null
}

export function getGrade(subjectId, grade) {
  const subject = getSubject(subjectId)

  if (!subject) {
    return null
  }

  return subject[`grade${grade}`] || null
}

export function getUnits(subjectId, grade) {
  const gradeData = getGrade(subjectId, grade)

  if (!gradeData) {
    return []
  }

  return gradeData.units || []
}

export function getUnit(subjectId, grade, unitNumber) {
  const units = getUnits(subjectId, grade)

  return (
    units.find(
      unit => String(unit.number) === String(unitNumber)
    ) || null
  )
}

export function getSection(
  subjectId,
  grade,
  unitNumber,
  sectionNumber
) {
  const unit = getUnit(subjectId, grade, unitNumber)

  if (!unit) {
    return null
  }

  return (
    (unit.sections || []).find(
      section =>
        String(section.number) === String(sectionNumber)
    ) || null
  )
}

export function getRelationships() {
  return KNOWLEDGE_MAP.crossSubjectRelationships
}

export function validateKnowledgeMap() {
  const errors = []

  for (const [subjectId, subject] of Object.entries(
    KNOWLEDGE_MAP.subjects
  )) {
    if (!subject) {
      errors.push(`Missing subject: ${subjectId}`)
      continue
    }

    for (const [gradeKey, gradeData] of Object.entries(
      subject
    )) {
      if (!gradeData?.units) {
        continue
      }

      for (const unit of gradeData.units) {
        if (!unit.title) {
          errors.push(
            `${subjectId}/${gradeKey}: unit without title`
          )
        }f
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    subjects: Object.keys(KNOWLEDGE_MAP.subjects).length,
    relationships:
      KNOWLEDGE_MAP.crossSubjectRelationships.length
  }
}

export default KNOWLEDGE_MAP