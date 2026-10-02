// Each line is "clue | answer | alias | alias" (clue mode) or "answer | alias" (list mode).
export default [
  {
    slug: 'elements-1-20',
    cat: 'chemistry',
    title: 'The First 20 Elements',
    desc: 'Name the element from its atomic number.',
    mode: 'clue',
    clueLabel: 'Atomic no.',
    answerLabel: 'Element',
    time: 180,
    lines: `
1 | Hydrogen
2 | Helium
3 | Lithium
4 | Beryllium
5 | Boron
6 | Carbon
7 | Nitrogen
8 | Oxygen
9 | Fluorine
10 | Neon
11 | Sodium
12 | Magnesium
13 | Aluminium
14 | Silicon
15 | Phosphorus
16 | Sulfur
17 | Chlorine
18 | Argon
19 | Potassium
20 | Calcium`,
  },
  {
    slug: 'elements-21-40',
    cat: 'chemistry',
    title: 'Elements 21 to 40',
    desc: 'The transition metals and friends. Name the element from its atomic number.',
    mode: 'clue',
    clueLabel: 'Atomic no.',
    answerLabel: 'Element',
    time: 240,
    lines: `
21 | Scandium
22 | Titanium
23 | Vanadium
24 | Chromium
25 | Manganese
26 | Iron
27 | Cobalt
28 | Nickel
29 | Copper
30 | Zinc
31 | Gallium
32 | Germanium
33 | Arsenic
34 | Selenium
35 | Bromine
36 | Krypton
37 | Rubidium
38 | Strontium
39 | Yttrium
40 | Zirconium`,
  },
  {
    slug: 'element-symbols',
    cat: 'chemistry',
    title: 'Element Symbols',
    desc: 'Name the element from its chemical symbol.',
    mode: 'clue',
    clueLabel: 'Symbol',
    answerLabel: 'Element',
    time: 240,
    lines: `
H | Hydrogen
He | Helium
C | Carbon
N | Nitrogen
O | Oxygen
Ne | Neon
Mg | Magnesium
Al | Aluminium
Si | Silicon
P | Phosphorus
S | Sulfur
Cl | Chlorine
Ar | Argon
Ca | Calcium
Ti | Titanium
Cr | Chromium
Mn | Manganese
Co | Cobalt
Ni | Nickel
Zn | Zinc
As | Arsenic
Br | Bromine
Kr | Krypton
I | Iodine
Xe | Xenon
Pt | Platinum
U | Uranium
Pu | Plutonium
Ra | Radium
Rn | Radon`,
  },
  {
    slug: 'latin-element-symbols',
    cat: 'chemistry',
    title: 'Symbols That Don’t Match',
    desc: 'These symbols come from Latin or German names. Name the element.',
    mode: 'clue',
    clueLabel: 'Symbol',
    answerLabel: 'Element',
    time: 90,
    lines: `
Na | Sodium
K | Potassium
Fe | Iron
Cu | Copper
Ag | Silver
Sn | Tin
Sb | Antimony
W | Tungsten
Au | Gold
Hg | Mercury
Pb | Lead`,
  },
  {
    slug: 'noble-gases',
    cat: 'chemistry',
    title: 'The Noble Gases',
    desc: 'Name all seven elements in group 18 of the periodic table.',
    mode: 'list',
    answerLabel: 'Noble gas',
    time: 60,
    lines: `
Helium
Neon
Argon
Krypton
Xenon
Radon
Oganesson`,
  },
  {
    slug: 'alkali-metals',
    cat: 'chemistry',
    title: 'The Alkali Metals',
    desc: 'Name all six alkali metals in group 1.',
    mode: 'list',
    answerLabel: 'Alkali metal',
    time: 60,
    lines: `
Lithium
Sodium
Potassium
Rubidium
Caesium
Francium`,
  },
  {
    slug: 'halogens',
    cat: 'chemistry',
    title: 'The Halogens',
    desc: 'Name all six elements in group 17.',
    mode: 'list',
    answerLabel: 'Halogen',
    time: 60,
    lines: `
Fluorine
Chlorine
Bromine
Iodine
Astatine
Tennessine`,
  },
  {
    slug: 'alkaline-earth-metals',
    cat: 'chemistry',
    title: 'The Alkaline Earth Metals',
    desc: 'Name all six elements in group 2.',
    mode: 'list',
    answerLabel: 'Element',
    time: 60,
    lines: `
Beryllium
Magnesium
Calcium
Strontium
Barium
Radium`,
  },
  {
    slug: 'diatomic-elements',
    cat: 'chemistry',
    title: 'The Diatomic Elements',
    desc: 'Name the seven elements that naturally exist as two-atom molecules.',
    mode: 'list',
    answerLabel: 'Element',
    time: 60,
    lines: `
Hydrogen
Nitrogen
Oxygen
Fluorine
Chlorine
Bromine
Iodine`,
  },
  {
    slug: 'metalloids',
    cat: 'chemistry',
    title: 'The Metalloids',
    desc: 'Name the six elements most commonly classed as metalloids.',
    mode: 'list',
    answerLabel: 'Metalloid',
    time: 60,
    lines: `
Boron
Silicon
Germanium
Arsenic
Antimony
Tellurium`,
  },
  {
    slug: 'elements-named-after-people',
    cat: 'chemistry',
    title: 'Elements Named After Scientists',
    desc: 'Name the element honouring each scientist.',
    mode: 'clue',
    clueLabel: 'Named after',
    answerLabel: 'Element',
    time: 150,
    lines: `
Albert Einstein | Einsteinium
Marie and Pierre Curie | Curium
Dmitri Mendeleev | Mendelevium
Alfred Nobel | Nobelium
Enrico Fermi | Fermium
Ernest Rutherford | Rutherfordium
Niels Bohr | Bohrium
Nicolaus Copernicus | Copernicium
Lise Meitner | Meitnerium
Wilhelm Röntgen | Roentgenium
Glenn Seaborg | Seaborgium
Ernest Lawrence | Lawrencium
Georgy Flyorov | Flerovium
Yuri Oganessian | Oganesson`,
  },
  {
    slug: 'elements-named-after-places',
    cat: 'chemistry',
    title: 'Elements Named After Places',
    desc: 'Name the element named after each place.',
    mode: 'clue',
    clueLabel: 'Place',
    answerLabel: 'Element',
    time: 180,
    lines: `
The Americas | Americium
Europe | Europium
France | Francium
Germany | Germanium
Poland | Polonium
Gaul (Latin for France) | Gallium
California | Californium
Berkeley | Berkelium
Darmstadt | Darmstadtium
Hesse | Hassium
Japan (Nihon) | Nihonium
Moscow | Moscovium
Tennessee | Tennessine
Dubna | Dubnium
Scandinavia | Scandium
Russia (Ruthenia) | Ruthenium
Paris (Lutetia) | Lutetium
Stockholm (Holmia) | Holmium
Copenhagen (Hafnia) | Hafnium
Strontian, Scotland | Strontium`,
  },
  {
    slug: 'chemical-formulas',
    cat: 'chemistry',
    title: 'Name the Compound',
    desc: 'Give the name of each compound from its chemical formula.',
    mode: 'clue',
    clueLabel: 'Formula',
    answerLabel: 'Compound',
    time: 240,
    lines: `
H₂O | Water
CO₂ | Carbon dioxide
NaCl | Sodium chloride | Salt | Table salt
NH₃ | Ammonia
CH₄ | Methane
H₂SO₄ | Sulfuric acid
HCl | Hydrochloric acid
NaOH | Sodium hydroxide
CaCO₃ | Calcium carbonate
NaHCO₃ | Sodium bicarbonate | Sodium hydrogen carbonate | Baking soda
H₂O₂ | Hydrogen peroxide
O₃ | Ozone
C₆H₁₂O₆ | Glucose
CO | Carbon monoxide
HNO₃ | Nitric acid
C₂H₅OH | Ethanol | Ethyl alcohol | Alcohol
N₂O | Nitrous oxide | Laughing gas
SiO₂ | Silicon dioxide | Silica | Quartz
Fe₂O₃ | Iron(III) oxide | Iron oxide | Rust | Ferric oxide
C₃H₈ | Propane`,
  },
  {
    slug: 'common-chemical-names',
    cat: 'chemistry',
    title: 'Everyday Names, Chemical Names',
    desc: 'Give the chemical name of each everyday substance.',
    mode: 'clue',
    clueLabel: 'Common name',
    answerLabel: 'Chemical name',
    time: 240,
    lines: `
Table salt | Sodium chloride
Baking soda | Sodium bicarbonate | Sodium hydrogen carbonate
Chalk | Calcium carbonate
Quicklime | Calcium oxide
Slaked lime | Calcium hydroxide
Household bleach | Sodium hypochlorite
Laughing gas | Nitrous oxide | Dinitrogen oxide
Dry ice | Carbon dioxide | Solid carbon dioxide
The acid in vinegar | Acetic acid | Ethanoic acid
Epsom salt | Magnesium sulfate
Plaster of Paris | Calcium sulfate | Calcium sulfate hemihydrate
Caustic soda | Sodium hydroxide
Washing soda | Sodium carbonate
Marsh gas | Methane
Quicksilver | Mercury
Muriatic acid | Hydrochloric acid
Blue vitriol | Copper sulfate | Copper(II) sulfate
Brimstone | Sulfur
Sand | Silicon dioxide | Silica
Grain alcohol | Ethanol | Ethyl alcohol`,
  },
  {
    slug: 'acids',
    cat: 'chemistry',
    title: 'Name the Acid',
    desc: 'Name each acid from its formula.',
    mode: 'clue',
    clueLabel: 'Formula',
    answerLabel: 'Acid',
    time: 150,
    lines: `
HCl | Hydrochloric acid
H₂SO₄ | Sulfuric acid
HNO₃ | Nitric acid
H₃PO₄ | Phosphoric acid
H₂CO₃ | Carbonic acid
CH₃COOH | Acetic acid | Ethanoic acid
HF | Hydrofluoric acid
HBr | Hydrobromic acid
HCN | Hydrocyanic acid | Prussic acid
HCOOH | Formic acid | Methanoic acid
H₂SO₃ | Sulfurous acid
HClO₄ | Perchloric acid
C₆H₈O₇ | Citric acid`,
  },
  {
    slug: 'lab-equipment',
    cat: 'chemistry',
    title: 'Name That Lab Equipment',
    desc: 'Identify each piece of school-lab equipment from its description.',
    mode: 'clue',
    clueLabel: 'Description',
    answerLabel: 'Equipment',
    time: 240,
    lines: `
Cylindrical glass container with a spout, for mixing and heating | Beaker
Narrow glass tube closed at one end | Test tube | Boiling tube
Gas burner with an adjustable air hole | Bunsen burner | Bunsen
Long graduated tube with a tap, used in titrations | Burette
Thin tube that transfers a precise volume of liquid | Pipette
Flask with a flat bottom and cone shape | Conical flask | Erlenmeyer flask
Tall graduated container for measuring volume | Measuring cylinder | Graduated cylinder
Cone used with filter paper | Funnel | Filter funnel
Shallow dish for evaporating a solution | Evaporating dish | Evaporating basin
Small heat-proof pot for very high temperatures | Crucible
Three-legged stand to hold things over a burner | Tripod
Wire mesh placed on a tripod | Gauze | Wire gauze
Tool for gripping hot objects | Tongs | Crucible tongs
Small flat scoop for transferring solids | Spatula
Bowl and club for grinding solids | Pestle and mortar | Mortar and pestle
Stand with a clamp to hold apparatus | Retort stand | Clamp stand
Glass tube that cools vapour back into liquid | Condenser | Liebig condenser
Curved glass disc for evaporating small amounts | Watch glass`,
  },
  {
    slug: 'element-clues',
    cat: 'chemistry',
    title: 'Guess the Element',
    desc: 'Name the element from the clue.',
    mode: 'clue',
    clueLabel: 'Clue',
    answerLabel: 'Element',
    time: 240,
    lines: `
The lightest element | Hydrogen
Fills party balloons; second most abundant in the universe | Helium
Most abundant element in Earth's crust | Oxygen
Makes up about 78% of the air | Nitrogen
Diamonds are made of it | Carbon
The main element in computer chips | Silicon
The only metal that is liquid at room temperature | Mercury
The only non-metal that is liquid at room temperature | Bromine
Symbol Au; never tarnishes | Gold
The best conductor of electricity | Silver
Used in electrical wiring; turned the Statue of Liberty green | Copper
Most of Earth's core; carried by your blood | Iron
Most abundant metal in Earth's crust | Aluminium
Fuel in most nuclear power stations | Uranium
Green-yellow gas used to disinfect swimming pools | Chlorine
Glows red-orange in advertising signs | Neon
Symbol Pb; once used in water pipes | Lead
Highest melting point of any metal | Tungsten
Main mineral element in bones and teeth | Calcium
Needed by the thyroid; forms purple vapour | Iodine
Gave old street lamps their orange glow | Sodium
Used in rechargeable phone batteries | Lithium`,
  },
  {
    slug: 'states-and-changes',
    cat: 'chemistry',
    title: 'States of Matter and Phase Changes',
    desc: 'Name each change of state.',
    mode: 'clue',
    clueLabel: 'Change',
    answerLabel: 'Name',
    time: 60,
    lines: `
Solid → liquid | Melting | Fusion
Liquid → solid | Freezing | Solidification
Liquid → gas | Evaporation | Boiling | Vaporisation
Gas → liquid | Condensation
Solid → gas | Sublimation
Gas → solid | Deposition | Desublimation
Gas → plasma | Ionisation`,
  },
];
