// Each line is "clue | answer | alias | alias" (clue mode) or "answer | alias" (list mode).
export default [
  {
    slug: 'si-base-units',
    cat: 'physics',
    title: 'The Seven SI Base Units',
    desc: 'Name the SI base unit for each quantity.',
    mode: 'clue',
    clueLabel: 'Quantity',
    answerLabel: 'Unit',
    time: 60,
    lines: `
Length | Metre
Mass | Kilogram
Time | Second
Electric current | Ampere | Amp
Temperature | Kelvin
Amount of substance | Mole
Luminous intensity | Candela`,
  },
  {
    slug: 'si-derived-units',
    cat: 'physics',
    title: 'SI Derived Units',
    desc: 'Name the SI unit used to measure each quantity.',
    mode: 'clue',
    clueLabel: 'Quantity',
    answerLabel: 'Unit',
    time: 180,
    lines: `
Force | Newton
Energy | Joule
Power | Watt
Pressure | Pascal
Frequency | Hertz
Electric charge | Coulomb
Voltage | Volt
Electrical resistance | Ohm
Capacitance | Farad
Inductance | Henry
Magnetic flux | Weber
Magnetic flux density | Tesla
Electrical conductance | Siemens
Radioactivity | Becquerel
Absorbed radiation dose | Gray
Equivalent radiation dose | Sievert
Illuminance | Lux
Luminous flux | Lumen
Plane angle | Radian`,
  },
  {
    slug: 'what-does-it-measure',
    cat: 'physics',
    title: 'What Does It Measure?',
    desc: 'Give the quantity each unit measures.',
    mode: 'clue',
    clueLabel: 'Unit',
    answerLabel: 'Quantity',
    time: 150,
    lines: `
Joule | Energy | Work
Newton | Force
Watt | Power
Pascal | Pressure
Hertz | Frequency
Coulomb | Charge | Electric charge
Volt | Voltage | Potential difference | EMF
Ohm | Resistance | Electrical resistance
Kelvin | Temperature
Ampere | Current | Electric current
Mole | Amount of substance
Candela | Luminous intensity
Becquerel | Radioactivity | Activity
Tesla | Magnetic field | Magnetic flux density | Magnetic field strength
Decibel | Sound level | Loudness | Sound intensity
Light-year | Distance | Length`,
  },
  {
    slug: 'units-named-after-scientists',
    cat: 'physics',
    title: 'Units Named After Scientists',
    desc: 'Who is each unit named after? Surnames are fine.',
    mode: 'clue',
    clueLabel: 'Unit',
    answerLabel: 'Scientist',
    time: 180,
    lastName: true,
    lines: `
Newton | Isaac Newton
Joule | James Joule
Watt | James Watt
Pascal | Blaise Pascal
Hertz | Heinrich Hertz
Coulomb | Charles-Augustin de Coulomb
Volt | Alessandro Volta
Ohm | Georg Ohm
Ampere | André-Marie Ampère
Kelvin | Lord Kelvin | William Thomson | Thomson
Farad | Michael Faraday
Henry | Joseph Henry
Weber | Wilhelm Weber
Tesla | Nikola Tesla
Siemens | Werner von Siemens
Becquerel | Henri Becquerel
Gray | Louis Harold Gray
Sievert | Rolf Sievert
Degree Celsius | Anders Celsius`,
  },
  {
    slug: 'si-prefixes',
    cat: 'physics',
    title: 'SI Prefixes',
    desc: 'Name the prefix for each power of ten.',
    mode: 'clue',
    clueLabel: 'Multiplier',
    answerLabel: 'Prefix',
    time: 180,
    lines: `
10²⁴ | Yotta
10²¹ | Zetta
10¹⁸ | Exa
10¹⁵ | Peta
10¹² | Tera
10⁹ | Giga
10⁶ | Mega
10³ | Kilo
10² | Hecto
10¹ | Deca | Deka
10⁻¹ | Deci
10⁻² | Centi
10⁻³ | Milli
10⁻⁶ | Micro
10⁻⁹ | Nano
10⁻¹² | Pico
10⁻¹⁵ | Femto
10⁻¹⁸ | Atto
10⁻²¹ | Zepto
10⁻²⁴ | Yocto`,
  },
  {
    slug: 'physical-constants',
    cat: 'physics',
    title: 'Physical Constants',
    desc: 'Name each fundamental constant from its symbol and value.',
    mode: 'clue',
    clueLabel: 'Symbol & value',
    answerLabel: 'Constant',
    time: 180,
    lines: `
c ≈ 3.00 × 10⁸ m/s | Speed of light | Speed of light in a vacuum
G ≈ 6.67 × 10⁻¹¹ N m²/kg² | Gravitational constant | Newton's gravitational constant | Universal gravitational constant
h ≈ 6.63 × 10⁻³⁴ J s | Planck constant | Planck's constant
ħ = h/2π | Reduced Planck constant | Dirac constant | H bar
e ≈ 1.60 × 10⁻¹⁹ C | Elementary charge | Charge of an electron | Electron charge
Nᴀ ≈ 6.02 × 10²³ mol⁻¹ | Avogadro constant | Avogadro's number | Avogadro's constant
k_B ≈ 1.38 × 10⁻²³ J/K | Boltzmann constant | Boltzmann's constant
R ≈ 8.31 J/(mol K) | Gas constant | Molar gas constant | Ideal gas constant | Universal gas constant
mₑ ≈ 9.11 × 10⁻³¹ kg | Electron mass | Mass of an electron
ε₀ ≈ 8.85 × 10⁻¹² F/m | Permittivity of free space | Vacuum permittivity | Electric constant
μ₀ ≈ 1.26 × 10⁻⁶ N/A² | Permeability of free space | Vacuum permeability | Magnetic constant
σ ≈ 5.67 × 10⁻⁸ W/(m² K⁴) | Stefan-Boltzmann constant
α ≈ 1/137 | Fine-structure constant | Fine structure constant
g ≈ 9.81 m/s² | Acceleration due to gravity | Standard gravity | Gravitational acceleration`,
  },
  {
    slug: 'physics-equations',
    cat: 'physics',
    title: 'Name That Equation',
    desc: 'Name the law or quantity each famous equation describes.',
    mode: 'clue',
    clueLabel: 'Equation',
    answerLabel: 'Name',
    time: 240,
    lines: `
F = ma | Newton's second law | Newton's 2nd law | Second law of motion
E = mc² | Mass-energy equivalence | Mass energy equivalence
V = IR | Ohm's law
PV = nRT | Ideal gas law | Ideal gas equation
F = −kx | Hooke's law
p = mv | Momentum
E = hf | Planck relation | Planck's equation | Planck-Einstein relation | Photon energy
F = Gm₁m₂/r² | Law of universal gravitation | Newton's law of gravitation | Universal gravitation | Newton's law of universal gravitation
P₁V₁ = P₂V₂ | Boyle's law
KE = ½mv² | Kinetic energy
W = Fd | Work | Work done
P = W/t | Power
v = fλ | Wave equation | Wave speed equation
n₁ sin θ₁ = n₂ sin θ₂ | Snell's law
Δx Δp ≥ ħ/2 | Uncertainty principle | Heisenberg uncertainty principle | Heisenberg's uncertainty principle
λ = h/p | De Broglie wavelength | De Broglie relation | De Broglie equation
ρ = m/V | Density
V₁/T₁ = V₂/T₂ | Charles's law | Charles law | Charles' law`,
  },
  {
    slug: 'electromagnetic-spectrum',
    cat: 'physics',
    title: 'The Electromagnetic Spectrum',
    desc: 'Name all seven main regions of the electromagnetic spectrum.',
    mode: 'list',
    answerLabel: 'Region',
    time: 60,
    lines: `
Radio waves | Radio
Microwaves | Microwave
Infrared | IR
Visible light | Visible | Light
Ultraviolet | UV
X-rays | X-ray
Gamma rays | Gamma | Gamma ray`,
  },
  {
    slug: 'colours-of-the-rainbow',
    cat: 'physics',
    title: 'Colours of the Rainbow',
    desc: 'Name the seven traditional colours of the rainbow.',
    mode: 'list',
    answerLabel: 'Colour',
    time: 45,
    lines: `
Red
Orange
Yellow
Green
Blue
Indigo
Violet`,
  },
  {
    slug: 'standard-model-particles',
    cat: 'physics',
    title: 'The 17 Fundamental Particles',
    desc: 'Name every particle in the Standard Model of particle physics.',
    mode: 'list',
    answerLabel: 'Particle',
    time: 240,
    lines: `
Up quark | Up
Down quark | Down
Charm quark | Charm
Strange quark | Strange
Top quark | Top
Bottom quark | Bottom
Electron
Muon
Tau
Electron neutrino
Muon neutrino
Tau neutrino
Photon
Gluon
W boson | W
Z boson | Z
Higgs boson | Higgs`,
  },
  {
    slug: 'fundamental-forces',
    cat: 'physics',
    title: 'The Four Fundamental Forces',
    desc: 'Name the four fundamental forces of nature.',
    mode: 'list',
    answerLabel: 'Force',
    time: 45,
    lines: `
Gravity | Gravitation | Gravitational force
Electromagnetism | Electromagnetic force | Electromagnetic
Strong nuclear force | Strong force | Strong interaction | Strong nuclear | Strong
Weak nuclear force | Weak force | Weak interaction | Weak nuclear | Weak`,
  },
  {
    slug: 'simple-machines',
    cat: 'physics',
    title: 'The Six Simple Machines',
    desc: 'Name the six classical simple machines.',
    mode: 'list',
    answerLabel: 'Machine',
    time: 60,
    lines: `
Lever
Wheel and axle | Wheel & axle
Pulley
Inclined plane | Ramp
Wedge
Screw`,
  },
  {
    slug: 'name-the-particle',
    cat: 'physics',
    title: 'Name the Particle',
    desc: 'Identify each subatomic particle from its description.',
    mode: 'clue',
    clueLabel: 'Description',
    answerLabel: 'Particle',
    time: 150,
    lines: `
Negatively charged; surrounds the nucleus | Electron
Positively charged; found in the nucleus | Proton
No charge; found in the nucleus | Neutron
A particle of light | Photon
The antimatter twin of the electron | Positron | Antielectron
Linked to the field that gives particles mass | Higgs boson | Higgs
Glues quarks together | Gluon
"Ghost particle" that barely interacts | Neutrino
A helium nucleus emitted in radioactive decay | Alpha particle | Alpha
Any particle made of three quarks | Baryon
A particle made of a quark and an antiquark | Meson
Heavier cousin of the electron | Muon`,
  },
  {
    slug: 'scientific-instruments',
    cat: 'physics',
    title: 'Scientific Instruments',
    desc: 'Name the instrument used to measure or observe each thing.',
    mode: 'clue',
    clueLabel: 'Measures',
    answerLabel: 'Instrument',
    time: 240,
    lines: `
Temperature | Thermometer
Air pressure | Barometer
Electric current | Ammeter
Voltage | Voltmeter
Earthquakes | Seismometer | Seismograph
Humidity | Hygrometer
Wind speed | Anemometer
Ionising radiation | Geiger counter | Geiger-Müller counter | Geiger
Very distant objects | Telescope
Very small objects | Microscope
Angles | Protractor
The heart's electrical activity | Electrocardiograph | ECG | EKG | Electrocardiogram
Blood pressure | Sphygmomanometer
Density of a liquid | Hydrometer
Rainfall | Rain gauge
Altitude | Altimeter
Speed of a vehicle | Speedometer
Direction relative to magnetic north | Compass`,
  },
  {
    slug: 'branches-of-physical-science',
    cat: 'physics',
    title: 'Branches of Physics and Chemistry',
    desc: 'Name the branch of science that studies each topic.',
    mode: 'clue',
    clueLabel: 'Studies',
    answerLabel: 'Branch',
    time: 150,
    lines: `
Light and its behaviour | Optics
Sound | Acoustics
Heat, energy and work | Thermodynamics
Electricity and magnetism | Electromagnetism
Motion and forces | Mechanics | Classical mechanics
The behaviour of very small particles | Quantum mechanics | Quantum physics
Atomic nuclei | Nuclear physics
The universe as a whole | Cosmology
Compounds of carbon | Organic chemistry
The chemistry of living things | Biochemistry
The speed of chemical reactions | Chemical kinetics | Kinetics
Electricity produced by chemical reactions | Electrochemistry`,
  },
  {
    slug: 'greek-letters-in-science',
    cat: 'physics',
    title: 'Greek Letters in Science',
    desc: 'Name each Greek letter used in science and maths.',
    mode: 'clue',
    clueLabel: 'Letter',
    answerLabel: 'Name',
    time: 120,
    lines: `
α | Alpha
β | Beta
γ | Gamma
δ | Delta
ε | Epsilon
θ | Theta
λ | Lambda
μ | Mu
ν | Nu
π | Pi
ρ | Rho
σ | Sigma
τ | Tau
φ | Phi
ψ | Psi
ω | Omega`,
  },
];
