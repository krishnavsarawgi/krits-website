// Each line is "clue | answer | alias | alias" (clue mode) or "answer | alias" (list mode).
export default [
  {
    slug: 'planets',
    cat: 'space',
    title: 'The Planets',
    desc: 'Name the eight planets of the solar system.',
    mode: 'list',
    answerLabel: 'Planet',
    time: 60,
    lines: `
Mercury
Venus
Earth
Mars
Jupiter
Saturn
Uranus
Neptune`,
  },
  {
    slug: 'planet-clues',
    cat: 'space',
    title: 'Which Planet?',
    desc: 'Name the planet from the clue.',
    mode: 'clue',
    clueLabel: 'Clue',
    answerLabel: 'Planet',
    time: 90,
    lines: `
Smallest planet and closest to the Sun | Mercury
Hottest planet, under thick clouds of CO₂ | Venus
The only planet known to host life | Earth
Home of Olympus Mons, the tallest volcano | Mars
Biggest planet; has the Great Red Spot | Jupiter
Least dense planet; would float in water | Saturn
Spins on its side | Uranus
Fastest winds; farthest from the Sun | Neptune`,
  },
  {
    slug: 'dwarf-planets',
    cat: 'space',
    title: 'The Dwarf Planets',
    desc: 'Name the five officially recognised dwarf planets.',
    mode: 'list',
    answerLabel: 'Dwarf planet',
    time: 60,
    lines: `
Pluto
Ceres
Eris
Haumea
Makemake`,
  },
  {
    slug: 'moons-of-the-solar-system',
    cat: 'space',
    title: 'Moons of the Solar System',
    desc: 'Name each moon from the clue.',
    mode: 'clue',
    clueLabel: 'Clue',
    answerLabel: 'Moon',
    time: 180,
    lines: `
Largest moon in the solar system (Jupiter) | Ganymede
Saturn's moon with a thick, hazy atmosphere | Titan
Jupiter's volcanic moon | Io
Jupiter's icy moon with a hidden ocean | Europa
Jupiter's heavily cratered outer large moon | Callisto
Mars's larger, closer moon | Phobos
Mars's smaller, outer moon | Deimos
Neptune's largest moon; orbits backwards | Triton
Pluto's largest moon | Charon
Saturn's moon spraying icy geysers | Enceladus
Saturn's moon that looks like the Death Star | Mimas
Uranus's largest moon | Titania
Saturn's two-toned moon | Iapetus
Earth's natural satellite | The Moon | Moon | Luna`,
  },
  {
    slug: 'zodiac-constellations',
    cat: 'space',
    title: 'Constellations of the Zodiac',
    desc: 'Name the twelve zodiac constellations the Sun passes through.',
    mode: 'list',
    answerLabel: 'Constellation',
    time: 120,
    lines: `
Aries
Taurus
Gemini
Cancer
Leo
Virgo
Libra
Scorpius | Scorpio
Sagittarius
Capricornus | Capricorn
Aquarius
Pisces`,
  },
  {
    slug: 'phases-of-the-moon',
    cat: 'space',
    title: 'Phases of the Moon',
    desc: 'Name all eight phases of the Moon.',
    mode: 'list',
    answerLabel: 'Phase',
    time: 90,
    lines: `
New moon
Waxing crescent
First quarter
Waxing gibbous
Full moon
Waning gibbous
Third quarter | Last quarter
Waning crescent`,
  },
  {
    slug: 'space-firsts',
    cat: 'space',
    title: 'Space Exploration Firsts',
    desc: 'Name the person or spacecraft behind each milestone. Surnames are fine.',
    mode: 'clue',
    clueLabel: 'Milestone',
    answerLabel: 'Answer',
    time: 180,
    lastName: true,
    lines: `
First human in space (1961) | Yuri Gagarin
First person to walk on the Moon | Neil Armstrong
Second person to walk on the Moon | Buzz Aldrin
First woman in space | Valentina Tereshkova
First American in space | Alan Shepard
First American woman in space | Sally Ride
First person to perform a spacewalk | Alexei Leonov
First Indian in space | Rakesh Sharma
First artificial satellite | Sputnik 1 | Sputnik
First animal to orbit the Earth | Laika
First space station | Salyut 1 | Salyut
First spacecraft to enter interstellar space | Voyager 1 | Voyager
First mission to land near the Moon's south pole | Chandrayaan-3 | Chandrayaan 3 | Chandrayaan
First powered flight on another planet | Ingenuity
India's first Mars orbiter | Mangalyaan | Mars Orbiter Mission | MOM`,
  },
  {
    slug: 'brightest-stars',
    cat: 'space',
    title: 'Famous Stars',
    desc: 'Name each star from the clue.',
    mode: 'clue',
    clueLabel: 'Clue',
    answerLabel: 'Star',
    time: 180,
    lines: `
Brightest star in the night sky | Sirius | Dog Star
Second brightest star in the night sky | Canopus
The North Star | Polaris | Pole Star
Nearest star to the Sun | Proxima Centauri | Proxima
Red supergiant on Orion's shoulder | Betelgeuse
Blue supergiant at Orion's foot | Rigel
Brightest star in Lyra | Vega
Red heart of Scorpius | Antares
Red eye of Taurus the bull | Aldebaran
Brightest star in the northern celestial hemisphere | Arcturus
Tail of Cygnus the swan | Deneb
Brightest star in Aquila | Altair
Brightest star in Virgo | Spica
Heart of Leo | Regulus
The star at the centre of our solar system | The Sun | Sun | Sol`,
  },
  {
    slug: 'layers-of-earth-and-sky',
    cat: 'earth',
    title: 'Layers of the Earth and Atmosphere',
    desc: 'Name each layer from its description.',
    mode: 'clue',
    clueLabel: 'Description',
    answerLabel: 'Layer',
    time: 120,
    lines: `
Thin, rocky outer layer of the Earth | Crust
Thick layer of hot, slowly flowing rock | Mantle
Liquid iron layer that generates the magnetic field | Outer core
Solid iron ball at the centre | Inner core
Lowest layer of the atmosphere, where weather happens | Troposphere
Atmospheric layer containing the ozone layer | Stratosphere
Layer where most meteors burn up | Mesosphere
Hot layer where aurorae and the ISS are found | Thermosphere
Outermost layer, fading into space | Exosphere`,
  },
  {
    slug: 'mohs-hardness-scale',
    cat: 'earth',
    title: 'The Mohs Hardness Scale',
    desc: 'Name the reference mineral at each level of the Mohs scale.',
    mode: 'clue',
    clueLabel: 'Hardness',
    answerLabel: 'Mineral',
    time: 120,
    lines: `
1 | Talc
2 | Gypsum
3 | Calcite
4 | Fluorite
5 | Apatite
6 | Orthoclase | Feldspar | Orthoclase feldspar
7 | Quartz
8 | Topaz
9 | Corundum
10 | Diamond`,
  },
  {
    slug: 'name-the-rock',
    cat: 'earth',
    title: 'Name the Rock',
    desc: 'Identify each rock from its description.',
    mode: 'clue',
    clueLabel: 'Description',
    answerLabel: 'Rock',
    time: 180,
    lines: `
Speckled igneous rock with large crystals; used for worktops | Granite
Dark, fine-grained volcanic rock forming the ocean floor | Basalt
Black volcanic glass | Obsidian
Frothy volcanic rock light enough to float | Pumice
Sedimentary rock made of cemented sand grains | Sandstone
Sedimentary rock made largely of shells and calcium carbonate | Limestone
Soft white limestone made of microscopic plankton | Chalk
Fine-grained sedimentary rock made from mud | Shale | Mudstone
Black sedimentary rock made from ancient plants | Coal
Metamorphosed limestone used in sculpture | Marble
Metamorphosed shale that splits into roof tiles | Slate
Metamorphosed sandstone | Quartzite
Banded metamorphic rock formed at high temperature | Gneiss
Sparkly, flaky metamorphic rock rich in mica | Schist`,
  },
  {
    slug: 'cloud-types',
    cat: 'earth',
    title: 'The Ten Cloud Types',
    desc: 'Name the ten main cloud genera.',
    mode: 'list',
    answerLabel: 'Cloud',
    time: 150,
    lines: `
Cirrus
Cirrocumulus
Cirrostratus
Altocumulus
Altostratus
Nimbostratus
Stratocumulus
Stratus
Cumulus
Cumulonimbus`,
  },
  {
    slug: 'greenhouse-gases',
    cat: 'earth',
    title: 'Greenhouse Gases',
    desc: 'Name the main gases that trap heat in Earth’s atmosphere.',
    mode: 'list',
    answerLabel: 'Gas',
    time: 90,
    lines: `
Carbon dioxide | CO2
Methane | CH4
Water vapour | Water | H2O
Nitrous oxide | N2O
Ozone | O3
Chlorofluorocarbons | CFCs | CFC
Sulfur hexafluoride | SF6`,
  },
];
