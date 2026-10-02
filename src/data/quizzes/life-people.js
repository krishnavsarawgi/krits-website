// Each line is "clue | answer | alias | alias" (clue mode) or "answer | alias" (list mode).
export default [
  {
    slug: 'dna-bases',
    cat: 'life',
    title: 'Bases of DNA and RNA',
    desc: 'Name the five nucleobases found in DNA and RNA.',
    mode: 'list',
    answerLabel: 'Base',
    time: 45,
    lines: `
Adenine
Thymine
Guanine
Cytosine
Uracil`,
  },
  {
    slug: 'cell-organelles',
    cat: 'life',
    title: 'Parts of the Cell',
    desc: 'Name the cell structure from its job.',
    mode: 'clue',
    clueLabel: 'Job',
    answerLabel: 'Structure',
    time: 180,
    lines: `
The cell's power station | Mitochondria | Mitochondrion
Carries out photosynthesis | Chloroplast | Chloroplasts
Holds the DNA and controls the cell | Nucleus
Builds proteins | Ribosome | Ribosomes
Controls what enters and leaves | Cell membrane | Plasma membrane | Membrane
Rigid outer layer of plant cells | Cell wall
Large sac of sap that keeps plant cells firm | Vacuole | Central vacuole
Packages and ships proteins | Golgi apparatus | Golgi body | Golgi
Digests waste and worn-out parts | Lysosome | Lysosomes
Jelly-like fluid filling the cell | Cytoplasm | Cytosol
Membrane network studded with ribosomes | Rough endoplasmic reticulum | Rough ER
Membrane network that makes lipids | Smooth endoplasmic reticulum | Smooth ER
Makes ribosomes inside the nucleus | Nucleolus
Protein scaffold that shapes the cell | Cytoskeleton
Whip-like tail used for swimming | Flagellum | Flagella`,
  },
  {
    slug: 'organs-of-the-body',
    cat: 'life',
    title: 'Organs of the Human Body',
    desc: 'Name the organ from its job.',
    mode: 'clue',
    clueLabel: 'Job',
    answerLabel: 'Organ',
    time: 180,
    lines: `
Pumps blood around the body | Heart
Filter blood and make urine | Kidneys | Kidney
Swap oxygen and carbon dioxide | Lungs | Lung
Makes bile and detoxifies chemicals | Liver
Stores bile | Gallbladder | Gall bladder
Makes insulin | Pancreas
Absorbs most nutrients from food | Small intestine
Absorbs water from waste | Large intestine | Colon
Digests food with acid | Stomach
Stores urine | Bladder | Urinary bladder
The body's largest organ | Skin
Controls thought and the nervous system | Brain
Filters old red blood cells | Spleen
The voice box | Larynx
Carries food from mouth to stomach | Oesophagus | Esophagus | Food pipe | Gullet
Gland in the neck that controls metabolism | Thyroid | Thyroid gland`,
  },
  {
    slug: 'bones-of-the-body',
    cat: 'life',
    title: 'Bones of the Body',
    desc: 'Give the scientific name of each bone.',
    mode: 'clue',
    clueLabel: 'Common name',
    answerLabel: 'Bone',
    time: 180,
    lines: `
Thigh bone | Femur
Lower jaw | Mandible
Collarbone | Clavicle
Shoulder blade | Scapula
Kneecap | Patella
Shinbone | Tibia
Breastbone | Sternum
Upper arm bone | Humerus
Smallest bone in the body (in the ear) | Stapes | Stirrup
Bones of the spine | Vertebrae | Vertebra
Forearm bone on the thumb side | Radius
Forearm bone on the little-finger side | Ulna
Thin outer bone of the lower leg | Fibula
Finger and toe bones | Phalanges | Phalanx
Wrist bones | Carpals | Carpal bones
Ankle bones | Tarsals | Tarsal bones
Tailbone | Coccyx
Cheekbone | Zygomatic bone | Zygomatic`,
  },
  {
    slug: 'vitamin-deficiencies',
    cat: 'life',
    title: 'Vitamins and Deficiency Diseases',
    desc: 'Which vitamin is lacking in each condition?',
    mode: 'clue',
    clueLabel: 'Condition',
    answerLabel: 'Vitamin',
    time: 90,
    lines: `
Scurvy | Vitamin C | C | Ascorbic acid
Rickets | Vitamin D | D
Night blindness | Vitamin A | A | Retinol
Beriberi | Vitamin B1 | B1 | Thiamine
Pellagra | Vitamin B3 | B3 | Niacin
Pernicious anaemia | Vitamin B12 | B12 | Cobalamin
Bleeding that won't clot | Vitamin K | K`,
  },
  {
    slug: 'blood-and-heart',
    cat: 'life',
    title: 'Blood and the Heart',
    desc: 'Name each part of the blood or circulatory system.',
    mode: 'clue',
    clueLabel: 'Description',
    answerLabel: 'Answer',
    time: 150,
    lines: `
Blood cells that carry oxygen | Red blood cells | Red cells | Erythrocytes | RBCs
Blood cells that fight infection | White blood cells | White cells | Leukocytes | WBCs
Cell fragments that help blood clot | Platelets | Thrombocytes
The straw-coloured liquid part of blood | Plasma
Iron-containing protein that binds oxygen | Haemoglobin | Hemoglobin
Vessels that carry blood away from the heart | Arteries | Artery
Vessels that carry blood back to the heart | Veins | Vein
Tiny vessels where exchange with tissues happens | Capillaries | Capillary
The body's largest artery | Aorta
Heart chamber that pumps blood to the whole body | Left ventricle
The heart's natural pacemaker | Sinoatrial node | SA node | Sinus node
Valve between left atrium and left ventricle | Mitral valve | Bicuspid valve | Mitral
Artery carrying blood to the lungs | Pulmonary artery`,
  },
  {
    slug: 'taxonomy-ranks',
    cat: 'life',
    title: 'Ranks of Classification',
    desc: 'Name the eight main ranks used to classify living things.',
    mode: 'list',
    answerLabel: 'Rank',
    time: 60,
    lines: `
Domain
Kingdom
Phylum
Class
Order
Family
Genus
Species`,
  },
  {
    slug: 'hormones',
    cat: 'life',
    title: 'Name the Hormone',
    desc: 'Identify each hormone from its job.',
    mode: 'clue',
    clueLabel: 'Job',
    answerLabel: 'Hormone',
    time: 150,
    lines: `
Lowers blood sugar | Insulin
Raises blood sugar | Glucagon
Triggers "fight or flight" | Adrenaline | Epinephrine
Makes you sleepy at night | Melatonin
Main male sex hormone | Testosterone
Main female sex hormone | Oestrogen | Estrogen
Controls metabolic rate (thyroid) | Thyroxine | T4
Long-term stress hormone | Cortisol
Helps the kidneys conserve water | ADH | Antidiuretic hormone | Vasopressin
Triggers milk production | Prolactin
Linked to childbirth and bonding | Oxytocin
Maintains pregnancy | Progesterone
The "hunger hormone" | Ghrelin
Drives growth in children | Growth hormone | Somatotropin | HGH`,
  },
  {
    slug: 'body-by-numbers',
    cat: 'life',
    title: 'The Human Body by Numbers',
    desc: 'Type the number that answers each question.',
    mode: 'clue',
    clueLabel: 'How many…',
    answerLabel: 'Number',
    time: 120,
    lines: `
Bones in an adult human | 206
Chromosomes in most human cells | 46
Pairs of chromosomes | 23
Chambers in the heart | 4
Teeth in a full adult set | 32
Baby (milk) teeth | 20
Pairs of ribs | 12
Tiny bones in each middle ear | 3
Normal body temperature in °C | 37
Vertebrae in the neck | 7
Lobes in the two lungs combined | 5
Bones in each wrist | 8`,
  },
  {
    slug: 'ologies',
    cat: 'general',
    title: 'The Ologies',
    desc: 'Name the branch of science that studies each subject.',
    mode: 'clue',
    clueLabel: 'Study of…',
    answerLabel: 'Field',
    time: 240,
    lines: `
Living things | Biology
Rocks and the Earth | Geology
Weather | Meteorology
Insects | Entomology
Birds | Ornithology
Fungi | Mycology
Fossils | Palaeontology | Paleontology
The mind and behaviour | Psychology
Plants | Botany
Animals | Zoology
Stars, planets and space | Astronomy
Earthquakes | Seismology
Oceans | Oceanography
Volcanoes | Volcanology | Vulcanology
Heredity and genes | Genetics
The immune system | Immunology
Viruses | Virology
Microorganisms | Microbiology
Fish | Ichthyology
Reptiles and amphibians | Herpetology
Drugs and medicines | Pharmacology
The heart | Cardiology
Skin | Dermatology
Caves | Speleology
Poisons | Toxicology`,
  },
  {
    slug: 'great-discoveries',
    cat: 'general',
    title: 'Who Discovered It?',
    desc: 'Name the scientist behind each idea or discovery. Surnames are fine.',
    mode: 'clue',
    clueLabel: 'Discovery',
    answerLabel: 'Scientist',
    time: 240,
    lastName: true,
    lines: `
Three laws of motion | Isaac Newton
Theory of relativity | Albert Einstein
Equations unifying electricity, magnetism and light | James Clerk Maxwell
Uncertainty principle | Werner Heisenberg
Wave equation of quantum mechanics | Erwin Schrödinger | Schrodinger
Exclusion principle | Wolfgang Pauli
Laws of planetary motion | Johannes Kepler
Law of elasticity (springs) | Robert Hooke
Principle of buoyancy | Archimedes
Pressure–volume law for gases | Robert Boyle
Electromagnetic induction | Michael Faraday
Natural selection | Charles Darwin
Laws of inheritance (pea plants) | Gregor Mendel
The periodic table | Dmitri Mendeleev
Sun-centred model of the solar system | Nicolaus Copernicus
Radioactivity (first observed) | Henri Becquerel
The atomic nucleus | Ernest Rutherford
The electron | J. J. Thomson | JJ Thomson
Black hole radiation | Stephen Hawking
Expanding universe (galaxies receding) | Edwin Hubble`,
  },
  {
    slug: 'medical-pioneers',
    cat: 'general',
    title: 'Pioneers of Medicine',
    desc: 'Name the scientist behind each medical breakthrough. Surnames are fine.',
    mode: 'clue',
    clueLabel: 'Breakthrough',
    answerLabel: 'Scientist',
    time: 180,
    lastName: true,
    lines: `
First vaccine (smallpox) | Edward Jenner
Penicillin | Alexander Fleming
Pasteurisation and germ theory | Louis Pasteur
X-rays | Wilhelm Röntgen | Roentgen | Rontgen
Circulation of the blood | William Harvey
Blood groups (ABO) | Karl Landsteiner
Insulin (co-discoverer) | Frederick Banting
First widely used polio vaccine | Jonas Salk
Antiseptic surgery | Joseph Lister
Bacterium that causes tuberculosis | Robert Koch
First to see bacteria under a microscope | Antonie van Leeuwenhoek | Leeuwenhoek
Coined the word "cell" | Robert Hooke
Modern nursing and hospital hygiene | Florence Nightingale
Handwashing to prevent childbed fever | Ignaz Semmelweis`,
  },
  {
    slug: 'inventors',
    cat: 'general',
    title: 'Inventions and Inventors',
    desc: 'Who is credited with each invention? Surnames are fine.',
    mode: 'clue',
    clueLabel: 'Invention',
    answerLabel: 'Inventor',
    time: 180,
    lastName: true,
    lines: `
Telephone | Alexander Graham Bell
Practical incandescent light bulb | Thomas Edison
World Wide Web | Tim Berners-Lee | Berners Lee
Long-distance radio | Guglielmo Marconi
First powered aeroplane | Wright brothers | Wright | Orville Wright | Wilbur Wright
Improved steam engine | James Watt
Movable-type printing press (Europe) | Johannes Gutenberg
Dynamite | Alfred Nobel
AC induction motor | Nikola Tesla
Electric battery (voltaic pile) | Alessandro Volta
First working television | John Logie Baird
Jet engine (patented 1930) | Frank Whittle
Lightning rod | Benjamin Franklin
Analytical Engine (mechanical computer) | Charles Babbage
Electric dynamo | Michael Faraday
Handheld mobile phone | Martin Cooper`,
  },
  {
    slug: 'women-in-science',
    cat: 'general',
    title: 'Women Who Changed Science',
    desc: 'Name each scientist from the clue. Surnames are fine.',
    mode: 'clue',
    clueLabel: 'Clue',
    answerLabel: 'Scientist',
    time: 240,
    lastName: true,
    lines: `
First person to win two Nobel Prizes | Marie Curie
Took "Photo 51" of DNA | Rosalind Franklin
Discovered pulsars as a student | Jocelyn Bell Burnell | Bell Burnell
Explained nuclear fission with Otto Frisch | Lise Meitner
Wrote the first computer program | Ada Lovelace
Wrote "Silent Spring" | Rachel Carson
Studied wild chimpanzees at Gombe | Jane Goodall
Found evidence for dark matter in galaxy rotation | Vera Rubin
Co-invented CRISPR gene editing | Jennifer Doudna | Emmanuelle Charpentier | Charpentier
Linked symmetry to conservation laws | Emmy Noether
First American woman in space | Sally Ride
NASA mathematician of "Hidden Figures" | Katherine Johnson
Fossil hunter of Lyme Regis | Mary Anning
Found the Cepheid period–luminosity law | Henrietta Swan Leavitt | Leavitt
mRNA vaccine pioneer, Nobel 2023 | Katalin Karikó | Kariko
Showed CO₂ traps heat from sunlight (1856) | Eunice Foote
First Indian woman to qualify in Western medicine | Anandibai Joshi | Anandi Gopal Joshi
Indian-born astronaut lost on Columbia | Kalpana Chawla`,
  },
  {
    slug: 'indian-scientists',
    cat: 'general',
    title: 'Great Indian Scientists',
    desc: 'Name each Indian scientist from the clue. Surnames are fine.',
    mode: 'clue',
    clueLabel: 'Clue',
    answerLabel: 'Scientist',
    time: 240,
    lastName: true,
    lines: `
Discovered the scattering of light named after him (Nobel 1930) | C. V. Raman | CV Raman
Calculated the maximum mass of a white dwarf | Subrahmanyan Chandrasekhar
Gave his name to the boson | Satyendra Nath Bose | S N Bose
Founded India's nuclear programme | Homi Bhabha | Homi J Bhabha
Founded India's space programme | Vikram Sarabhai
"Missile Man of India" and 11th President | A. P. J. Abdul Kalam | Abdul Kalam | APJ Abdul Kalam
Self-taught mathematical genius of infinite series | Srinivasa Ramanujan
Invented the crescograph to study plant growth | Jagadish Chandra Bose | J C Bose
Nobel for cracking the genetic code (1968) | Har Gobind Khorana
Nobel for the structure of the ribosome (2009) | Venkatraman Ramakrishnan
Equation for ionisation in stars | Meghnad Saha
Ancient astronomer who calculated π and Earth's rotation | Aryabhata
Ancient surgeon of plastic surgery fame | Sushruta
Founded India's first pharmaceutical company | Prafulla Chandra Ray | P C Ray
"Birdman of India" | Salim Ali`,
  },
];
