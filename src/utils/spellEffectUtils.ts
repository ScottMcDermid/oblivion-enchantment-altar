import { getConstantEffectMagnitude, SoulGem } from '@/utils/enchantmentUtils';

export type School =
  | 'Alteration'
  | 'Conjuration'
  | 'Destruction'
  | 'Illusion'
  | 'Mysticism'
  | 'Restoration';

export const schools: School[] = [
  'Alteration',
  'Conjuration',
  'Destruction',
  'Illusion',
  'Mysticism',
  'Restoration',
];

export type Attribute =
  | 'Strength'
  | 'Intelligence'
  | 'Willpower'
  | 'Agility'
  | 'Speed'
  | 'Endurance'
  | 'Personality'
  | 'Luck';
export const attributes: Attribute[] = [
  'Strength',
  'Intelligence',
  'Willpower',
  'Agility',
  'Speed',
  'Endurance',
  'Personality',
  'Luck',
];

export type Skill =
  | 'Acrobatics'
  | 'Alchemy'
  | 'Alteration'
  | 'Armorer'
  | 'Athletics'
  | 'Blade'
  | 'Block'
  | 'Blunt'
  | 'Conjuration'
  | 'Destruction'
  | 'Hand-to-Hand'
  | 'Heavy Armor'
  | 'Illusion'
  | 'Light Armor'
  | 'Marksman'
  | 'Mercantile'
  | 'Mysticism'
  | 'Restoration'
  | 'Security'
  | 'Sneak'
  | 'Speechcraft';
export const skills: Skill[] = [
  'Acrobatics',
  'Alchemy',
  'Alteration',
  'Armorer',
  'Athletics',
  'Blade',
  'Block',
  'Blunt',
  'Conjuration',
  'Destruction',
  'Hand-to-Hand',
  'Heavy Armor',
  'Illusion',
  'Light Armor',
  'Marksman',
  'Mercantile',
  'Mysticism',
  'Restoration',
  'Security',
  'Sneak',
  'Speechcraft',
];

export type LockLevel = 'Very Easy' | 'Easy' | 'Average' | 'Hard' | 'Very Hard';
export const lockLevels: LockLevel[] = ['Very Easy', 'Easy', 'Average', 'Hard', 'Very Hard'];
export const magnitudeByLockLevel: Record<LockLevel, number> = {
  'Very Easy': 7,
  Easy: 20,
  Average: 40,
  Hard: 80,
  'Very Hard': 99,
};

export type Mastery = 'Novice' | 'Apprentice' | 'Journeyman' | 'Expert' | 'Master';

export const MIN_MAGNITUDE = 3;
export const MIN_LEVEL_MAGNITUDE = 0;
export const MIN_AREA = 10;
export const MIN_DURATION = 1;
export const MAX_MAGNITUDE = 100;
export const MAX_LEVEL_MAGNITUDE = 25;
export const MAX_AREA = 100;
export const MAX_DURATION = 120;

export type SpellEffectName =
  | "Summon Rufio's Ghost"
  | 'Absorb Attribute'
  | 'Absorb Fatigue'
  | 'Absorb Health'
  | 'Absorb Magicka'
  | 'Absorb Skill'
  | 'Bound Axe'
  | 'Bound Boots'
  | 'Bound Bow'
  | 'Bound Cuirass'
  | 'Bound Dagger'
  | 'Bound Gauntlets'
  | 'Bound Greaves'
  | 'Bound Helmet'
  | 'Bound Mace'
  | 'Bound Shield'
  | 'Bound Sword'
  | 'Burden'
  | 'Calm'
  | 'Chameleon'
  | 'Charm'
  | 'Command Creature'
  | 'Command Humanoid'
  | 'Cure Disease'
  | 'Cure Paralysis'
  | 'Cure Poison'
  | 'Damage Attribute'
  | 'Damage Fatigue'
  | 'Damage Health'
  | 'Damage Magicka'
  | 'Demoralize'
  | 'Detect Life'
  | 'Disintegrate Armor'
  | 'Disintegrate Weapon'
  | 'Dispel'
  | 'Drain Attribute'
  | 'Drain Fatigue'
  | 'Drain Health'
  | 'Drain Magicka'
  | 'Drain Skill'
  | 'Feather'
  | 'Fire Damage'
  | 'Fire Shield'
  | 'Fortify Attribute'
  | 'Fortify Fatigue'
  | 'Fortify Health'
  | 'Fortify Magicka'
  | 'Fortify Skill'
  | 'Frenzy'
  | 'Frost Damage'
  | 'Frost Shield'
  | 'Invisibility'
  | 'Light'
  | 'Lock'
  | 'Night-Eye'
  | 'Open'
  | 'Paralyze'
  | 'Rally'
  | 'Reanimate'
  | 'Reflect Damage'
  | 'Reflect Spell'
  | 'Resist Disease'
  | 'Resist Fire'
  | 'Resist Frost'
  | 'Resist Magic'
  | 'Resist Normal Weapons'
  | 'Resist Paralysis'
  | 'Resist Poison'
  | 'Resist Shock'
  | 'Restore Attribute'
  | 'Restore Fatigue'
  | 'Restore Health'
  | 'Restore Magicka'
  | 'Shield'
  | 'Shock Damage'
  | 'Shock Shield'
  | 'Silence'
  | 'Soul Trap'
  | 'Spell Absorption'
  | 'Summon Ancestor Guardian'
  | 'Summon Bear'
  | 'Summon Clannfear'
  | 'Summon Daedroth'
  | 'Summon Dark Seducer'
  | 'Summon Decrepit Shambles'
  | 'Summon Dremora Lord'
  | 'Summon Dremora'
  | 'Summon Faded Wraith'
  | 'Summon Flame Atronach'
  | 'Summon Flesh Atronach'
  | 'Summon Frost Atronach'
  | 'Summon Ghost'
  | 'Summon Gloom Wraith'
  | 'Summon Gluttonous Hunger'
  | 'Summon Golden Saint'
  | 'Summon Headless Zombie'
  | 'Summon Hunger'
  | 'Summon Lich'
  | 'Summon Ravenous Hunger'
  | 'Summon Replete Shambles'
  | 'Summon Scamp'
  | 'Summon Shambles'
  | 'Summon Skeleton Champion'
  | 'Summon Skeleton Guardian'
  | 'Summon Skeleton Hero'
  | 'Summon Skeleton'
  | 'Summon Spider Daedra'
  | 'Summon Spiderling'
  | 'Summon Storm Atronach'
  | 'Summon Voracious Hunger'
  | 'Summon Xivilai'
  | 'Summon Zombie'
  | 'Sun Damage'
  | 'Telekinesis'
  | 'Turn Undead'
  | 'Water Breathing'
  | 'Water Walking'
  | 'Weakness to Disease'
  | 'Weakness to Fire'
  | 'Weakness to Frost'
  | 'Weakness to Magic'
  | 'Weakness to Normal Weapons'
  | 'Weakness to Poison'
  | 'Weakness to Shock';

export type SpellEffectParameter = 'Magnitude' | 'Area' | 'Duration';
export type EquipmentType = 'Weapon' | 'Worn';
export const equipmentTypes: EquipmentType[] = ['Weapon', 'Worn'];

export type SpellEffectDefinition = {
  availableEquipment: EquipmentType[];
  availableParameters: SpellEffectParameter[];
  barterFactor: number;
  baseCost: number;
  constantEffectFactor?: number;
  description: string;
  id: SpellEffectDefinitionId;
  isCursedEnchantment?: boolean;
  isFlatCostConstantEffect?: boolean;
  isLevelBasedMagnitude?: boolean;
  name: SpellEffectName;
  school: School;
  selectableAttribute?: boolean;
  selectableLockLevel?: boolean;
  selectableSkill?: boolean;
  unit: string;
};

export type SpellEffect = {
  id: SpellEffectDefinitionId;
  magnitude: number;
  area: number;
  duration: number;
  attribute?: Attribute;
  skill?: Skill;
  lockLevel?: LockLevel;
  magickaCost: number;
};

export type SpellEffectDefinitionId =
  | 'ABAT'
  | 'ABFA'
  | 'ABHE'
  | 'ABSK'
  | 'ABSP'
  | 'BABO'
  | 'BACU'
  | 'BAGA'
  | 'BAGR'
  | 'BAHE'
  | 'BASH'
  | 'BRDN'
  | 'BWAX'
  | 'BWBO'
  | 'BWDA'
  | 'BWMA'
  | 'BWSW'
  | 'CALM'
  | 'CHML'
  | 'CHRM'
  | 'COCR'
  | 'COHU'
  | 'CUDI'
  | 'CUPA'
  | 'CUPO'
  | 'DEMO'
  | 'DGAT'
  | 'DGFA'
  | 'DGHE'
  | 'DGSP'
  | 'DIAR'
  | 'DIWE'
  | 'DRAT'
  | 'DRFA'
  | 'DRHE'
  | 'DRSK'
  | 'DRSP'
  | 'DSPL'
  | 'DTCT'
  | 'FIDG'
  | 'FISH'
  | 'FOAT'
  | 'FOFA'
  | 'FOHE'
  | 'FOSK'
  | 'FOSP'
  | 'FRDG'
  | 'FRNZ'
  | 'FRSH'
  | 'FTHR'
  | 'INVI'
  | 'LGHT'
  | 'LISH'
  | 'NEYE'
  | 'OPEN'
  | 'PARA'
  | 'RALY'
  | 'REAT'
  | 'REDG'
  | 'REFA'
  | 'REHE'
  | 'RESP'
  | 'RFLC'
  | 'RSDI'
  | 'RSFI'
  | 'RSFR'
  | 'RSMA'
  | 'RSNW'
  | 'RSPA'
  | 'RSPO'
  | 'RSSH'
  | 'SABS'
  | 'SHDG'
  | 'SHLD'
  | 'SLNC'
  | 'STRP'
  | 'TELE'
  | 'TURN'
  | 'WABR'
  | 'WAWA'
  | 'WKDI'
  | 'WKFI'
  | 'WKFR'
  | 'WKMA'
  | 'WKNW'
  | 'WKPO'
  | 'WKSH'
  | 'Z001'
  | 'Z002'
  | 'Z003'
  | 'Z004'
  | 'Z005'
  | 'Z006'
  | 'Z007'
  | 'Z008'
  | 'Z009'
  | 'Z010'
  | 'Z012'
  | 'Z013'
  | 'Z014'
  | 'Z015'
  | 'ZCLA'
  | 'ZDAE'
  | 'ZDRE'
  | 'ZDRL'
  | 'ZFIA'
  | 'ZFRA'
  | 'ZGHO'
  | 'ZHDZ'
  | 'ZSCA'
  | 'ZSKA'
  | 'ZSKC'
  | 'ZSKE'
  | 'ZSKH'
  | 'ZSPD'
  | 'ZSTA'
  | 'ZWRA'
  | 'ZWRL'
  | 'ZXIV';

export const spellEffectDefinitionById: Record<SpellEffectDefinitionId, SpellEffectDefinition> = {
  ABAT: {
    availableEquipment: ['Weapon'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.95,
    description: "Transfer a portion of target's named attribute to you.",
    id: 'ABAT',
    name: 'Absorb Attribute',
    school: 'Restoration',
    selectableAttribute: true,
    unit: 'pts',
  },
  ABFA: {
    availableEquipment: ['Weapon'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 6,
    description: "Transfer a portion of target's Fatigue to you.",
    id: 'ABFA',
    name: 'Absorb Fatigue',
    school: 'Restoration',
    unit: 'pts',
  },
  ABHE: {
    availableEquipment: ['Weapon'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 16,
    description: "Transfer a portion of target's Health to you.",
    id: 'ABHE',
    name: 'Absorb Health',
    school: 'Restoration',
    unit: 'pts',
  },
  ABSK: {
    availableEquipment: ['Weapon'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 2.1,
    description: "Transfer a portion of target's named skill to you.",
    id: 'ABSK',
    name: 'Absorb Skill',
    school: 'Restoration',
    selectableSkill: true,
    unit: 'pts',
  },
  ABSP: {
    availableEquipment: ['Weapon'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 7.5,
    description: "Transfer a portion of target's Magicka to you.",
    id: 'ABSP',
    name: 'Absorb Magicka',
    school: 'Restoration',
    unit: 'pts',
  },
  BABO: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 12.0,
    description: 'Conjures a pair of Daedric Boots. (Light Armor)',
    id: 'BABO',
    name: 'Bound Boots',
    school: 'Conjuration',
    unit: 'pts',
  },
  BACU: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 12.0,
    description: 'Conjures a Daedric Cuirass. (Heavy Armor)',
    id: 'BACU',
    name: 'Bound Cuirass',
    school: 'Conjuration',
    unit: 'pts',
  },
  BAGA: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 8.0,
    description: 'Conjures a pair of Daedric Gauntlets. (Light Armor)',
    id: 'BAGA',
    name: 'Bound Gauntlets',
    school: 'Conjuration',
    unit: 'pts',
  },
  BAGR: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 12.0,
    description: 'Conjures a pair of Daedric Greaves. (Heavy Armor)',
    id: 'BAGR',
    name: 'Bound Greaves',
    school: 'Conjuration',
    unit: 'pts',
  },
  BAHE: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 12.0,
    description: 'Conjures a Daedric Helmet. (Light Armor)',
    id: 'BAHE',
    name: 'Bound Helmet',
    school: 'Conjuration',
    unit: 'pts',
  },
  BASH: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 18.0,
    description: 'Conjures a Daedric Shield. (Light Armor)',
    id: 'BASH',
    name: 'Bound Shield',
    school: 'Conjuration',
    unit: 'pts',
  },
  BRDN: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.21,
    constantEffectFactor: 0,
    description: "Reduce the target's maximum encumbrance.",
    id: 'BRDN',
    isCursedEnchantment: true,
    name: 'Burden',
    school: 'Alteration',
    unit: 'pts',
  },
  BWAX: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 39.0,
    description: 'Conjures a Daedric Axe. (Blunt One Hand, Speed: 1.1, Reach: 0.8, Damage: 18)',
    id: 'BWAX',
    name: 'Bound Axe',
    school: 'Conjuration',
    unit: 'pts',
  },
  BWBO: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 95.0,
    description: 'Conjures a Daedric Bow. (Marksmanship, Speed: 1.0, Damage: 15)',
    id: 'BWBO',
    name: 'Bound Bow',
    school: 'Conjuration',
    unit: 'pts',
  },
  BWDA: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 14.0,
    description: 'Conjures a Daedric Dagger. (Blade One Hand, Speed: 1.4, Reach: 0.6, Damage: 13)',
    id: 'BWDA',
    name: 'Bound Dagger',
    school: 'Conjuration',
    unit: 'pts',
  },
  BWMA: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 91.0,
    description: 'Conjures a Daedric Mace. (Blunt One Hand, Speed: 0.9, Reach: 1.0, Damage: 22)',
    id: 'BWMA',
    name: 'Bound Mace',
    school: 'Conjuration',
    unit: 'pts',
  },
  BWSW: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 235.0,
    description:
      'Conjures a Daedric Claymore. (Blade Two Hand, Speed: 0.8, Reach: 1.3, Damage: 29)',
    id: 'BWSW',
    name: 'Bound Sword',
    school: 'Conjuration',
    unit: 'pts',
  },
  CALM: {
    availableEquipment: [],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.47,
    description: "Decrease target's Aggression (inclination to attack).",
    id: 'CALM',
    isLevelBasedMagnitude: true,
    name: 'Calm',
    school: 'Illusion',
    unit: 'lvl',
  },
  CHML: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 65,
    baseCost: 0.63,
    constantEffectFactor: 3,
    description:
      'Blend into the surroundings. Similar to Invisibility, but not perfect, unless you use 100% Chameleon. However, the effect stays if you attack or do another action.',
    id: 'CHML',
    name: 'Chameleon',
    school: 'Illusion',
    unit: 'pts',
  },
  CHRM: {
    availableEquipment: [],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.2,
    description: "Increase target's disposition.",
    id: 'CHRM',
    name: 'Charm',
    school: 'Illusion',
    unit: 'pts',
  },
  COCR: {
    availableEquipment: ['Weapon'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.6,
    description: 'Make targeted creature fight for you.',
    id: 'COCR',
    isLevelBasedMagnitude: true,
    name: 'Command Creature',
    school: 'Illusion',
    unit: 'lvl',
  },
  COHU: {
    availableEquipment: [],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.75,
    description: 'Make targeted humanoid fight for you.',
    id: 'COHU',
    isLevelBasedMagnitude: true,
    name: 'Command Humanoid',
    school: 'Illusion',
    unit: 'lvl',
  },
  CUDI: {
    availableEquipment: [],
    availableParameters: ['Area'],
    barterFactor: 0,
    baseCost: 1400,
    description: 'Cures common disease.',
    id: 'CUDI',
    name: 'Cure Disease',
    school: 'Restoration',
    unit: 'pts',
  },
  CUPA: {
    availableEquipment: [],
    availableParameters: ['Area'],
    barterFactor: 0,
    baseCost: 500,
    description: 'Cures paralyzation.',
    id: 'CUPA',
    name: 'Cure Paralysis',
    school: 'Restoration',
    unit: 'pts',
  },
  CUPO: {
    availableEquipment: [],
    availableParameters: ['Area'],
    barterFactor: 0,
    baseCost: 600,
    description: 'Cures poisoning.',
    id: 'CUPO',
    name: 'Cure Poison',
    school: 'Restoration',
    unit: 'pts',
  },
  DEMO: {
    availableEquipment: ['Weapon'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.49,
    description: "Decrease target's Confidence (willingness to fight).",
    id: 'DEMO',
    isLevelBasedMagnitude: true,
    name: 'Demoralize',
    school: 'Illusion',
    unit: 'lvl',
  },
  DGAT: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 100.0,
    constantEffectFactor: 0,
    description: "Damages target's named attribute.",
    id: 'DGAT',
    isCursedEnchantment: true,
    name: 'Damage Attribute',
    school: 'Destruction',
    selectableAttribute: true,
    unit: 'pts',
  },
  DGFA: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 4.4,
    constantEffectFactor: 0,
    description: "Damages target's Fatigue.",
    id: 'DGFA',
    isCursedEnchantment: true,
    name: 'Damage Fatigue',
    school: 'Destruction',
    unit: 'pts',
  },
  DGHE: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 12.0,
    constantEffectFactor: 0,
    description: "Damages target's Health.",
    id: 'DGHE',
    isCursedEnchantment: true,
    name: 'Damage Health',
    school: 'Destruction',
    unit: 'pts',
  },
  DGSP: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 2.45,
    constantEffectFactor: 0,
    description: "Damages target's Magicka.",
    id: 'DGSP',
    isCursedEnchantment: true,
    name: 'Damage Magicka',
    school: 'Destruction',
    unit: 'pts',
  },
  DIAR: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 6.2,
    constantEffectFactor: 0,
    description: 'Damage the Health of equipped armor.',
    id: 'DIAR',
    isCursedEnchantment: true,
    name: 'Disintegrate Armor',
    school: 'Destruction',
    unit: 'pts',
  },
  DIWE: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 6.2,
    constantEffectFactor: 0,
    description: 'Damage the Health of an equipped weapon.',
    id: 'DIWE',
    isCursedEnchantment: true,
    name: 'Disintegrate Weapon',
    school: 'Destruction',
    unit: 'pts',
  },
  DRAT: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.7,
    constantEffectFactor: 0,
    description: "Temporarily lowers target's named attribute.",
    id: 'DRAT',
    isCursedEnchantment: true,
    name: 'Drain Attribute',
    school: 'Destruction',
    selectableAttribute: true,
    unit: 'pts',
  },
  DRFA: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.18,
    constantEffectFactor: 0,
    description: "Temporarily lowers target's Fatigue.",
    id: 'DRFA',
    isCursedEnchantment: true,
    name: 'Drain Fatigue',
    school: 'Destruction',
    unit: 'pts',
  },
  DRHE: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.9,
    constantEffectFactor: 0,
    description: "Temporarily lowers target's Health.",
    id: 'DRHE',
    isCursedEnchantment: true,
    name: 'Drain Health',
    school: 'Destruction',
    unit: 'pts',
  },
  DRSK: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.65,
    constantEffectFactor: 0,
    description: "Temporarily lowers target's named skill.",
    id: 'DRSK',
    isCursedEnchantment: true,
    name: 'Drain Skill',
    school: 'Destruction',
    selectableSkill: true,
    unit: 'pts',
  },
  DRSP: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.18,
    constantEffectFactor: 0,
    description: "Temporarily lowers target's Magicka.",
    id: 'DRSP',
    isCursedEnchantment: true,
    name: 'Drain Magicka',
    school: 'Destruction',
    unit: 'pts',
  },
  DSPL: {
    availableEquipment: ['Weapon'],
    availableParameters: ['Magnitude', 'Area'],
    barterFactor: 0,
    baseCost: 3.6,
    description: 'Remove Magicka-based spell effects from the target.',
    id: 'DSPL',
    name: 'Dispel',
    school: 'Mysticism',
    unit: 'pts',
  },
  DTCT: {
    availableEquipment: ['Worn'],
    availableParameters: ['Magnitude', 'Duration'],
    barterFactor: 15,
    baseCost: 0.08,
    constantEffectFactor: 3,
    description: 'Allows to see living things through solid objects.',
    id: 'DTCT',
    name: 'Detect Life',
    school: 'Mysticism',
    unit: 'ft',
  },
  FIDG: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 7.5,
    constantEffectFactor: 0,
    description: 'Produce a manifestation of elemental fire.',
    id: 'FIDG',
    isCursedEnchantment: true,
    name: 'Fire Damage',
    school: 'Destruction',
    unit: 'pts',
  },
  FISH: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 100,
    baseCost: 0.95,
    constantEffectFactor: 1,
    description: "Creates a fire shield (armor points + fire resistance) around the target's body.",
    id: 'FISH',
    name: 'Fire Shield',
    school: 'Alteration',
    unit: 'pts',
  },
  FOAT: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 100,
    baseCost: 0.6,
    constantEffectFactor: 1,
    description: "Increase the value of target's named attribute.",
    id: 'FOAT',
    name: 'Fortify Attribute',
    school: 'Restoration',
    selectableAttribute: true,
    unit: 'pts',
  },
  FOFA: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 25,
    baseCost: 0.04,
    constantEffectFactor: 4,
    description: "Increase the value of target's Fatigue.",
    id: 'FOFA',
    name: 'Fortify Fatigue',
    school: 'Restoration',
    unit: 'pts',
  },
  FOHE: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 150,
    baseCost: 0.14,
    constantEffectFactor: 1,
    description: "Increase the value of target's Health.",
    id: 'FOHE',
    name: 'Fortify Health',
    school: 'Restoration',
    unit: 'pts',
  },
  FOSK: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 100,
    baseCost: 0.6,
    constantEffectFactor: 1,
    description: "Increase the value of target's named skill.",
    id: 'FOSK',
    name: 'Fortify Skill',
    school: 'Restoration',
    selectableSkill: true,
    unit: 'pts',
  },
  FOSP: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 100,
    baseCost: 0.15,
    constantEffectFactor: 4,
    description: "Increase the value of target's Magicka.",
    id: 'FOSP',
    name: 'Fortify Magicka',
    school: 'Restoration',
    unit: 'pts',
  },
  FRDG: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 7.4,
    constantEffectFactor: 0,
    description: 'Produce a manifestation of elemental frost.',
    id: 'FRDG',
    name: 'Frost Damage',
    school: 'Destruction',
    unit: 'pts',
  },
  FRNZ: {
    availableEquipment: ['Weapon'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.04,
    description: "Increase target's Aggression (inclination to attack).",
    id: 'FRNZ',
    isLevelBasedMagnitude: true,
    name: 'Frenzy',
    school: 'Illusion',
    unit: 'lvl',
  },
  FRSH: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 100,
    baseCost: 0.95,
    constantEffectFactor: 1,
    description:
      "Creates a frost shield (armor points + frost resistance) around the target's body.",
    id: 'FRSH',
    name: 'Frost Shield',
    school: 'Alteration',
    unit: 'pts',
  },
  FTHR: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 25,
    baseCost: 0.01,
    constantEffectFactor: 9,
    description: "Increase the target's maximum encumbrance.",
    id: 'FTHR',
    name: 'Feather',
    school: 'Alteration',
    unit: 'pts',
  },
  INVI: {
    availableEquipment: [],
    availableParameters: ['Area', 'Duration'],
    barterFactor: 0,
    baseCost: 40.0,
    description:
      'Makes the target invisible but not inaudible. The effect dissipates if the target does anything but move e.g attack or pickpocket.',
    id: 'INVI',
    name: 'Invisibility',
    school: 'Illusion',
    unit: 'pts',
  },
  LGHT: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 12.5,
    baseCost: 0.051,
    constantEffectFactor: 7,
    description: 'Illuminates the target.',
    id: 'LGHT',
    name: 'Light',
    school: 'Illusion',
    unit: 'ft',
  },
  LISH: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 100,
    baseCost: 0.95,
    constantEffectFactor: 1,
    description:
      "Creates a shock shield (armor points + shock resistance) around the target's body.",
    id: 'LISH',
    name: 'Shock Shield',
    school: 'Alteration',
    unit: 'pts',
  },
  NEYE: {
    availableEquipment: ['Worn'],
    availableParameters: [],
    barterFactor: 20,
    baseCost: 22.0,
    description: 'Ability to see in the dark.',
    id: 'NEYE',
    isFlatCostConstantEffect: true,
    name: 'Night-Eye',
    school: 'Illusion',
    unit: 'pts',
  },
  OPEN: {
    availableEquipment: [],
    availableParameters: ['Area'],
    barterFactor: 0,
    baseCost: 4.3,
    description: 'Opens a locked container or door.',
    id: 'OPEN',
    name: 'Open',
    school: 'Alteration',
    selectableLockLevel: true,
    unit: 'pts',
  },
  PARA: {
    availableEquipment: [],
    availableParameters: ['Area', 'Duration'],
    barterFactor: 0,
    baseCost: 475,
    description: 'Render target unable to move.',
    id: 'PARA',
    name: 'Paralyze',
    school: 'Illusion',
    unit: 'pts',
  },
  RALY: {
    availableEquipment: ['Weapon'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.03,
    description: "Increase target's Confidence (willingness to attack).",
    id: 'RALY',
    name: 'Rally',
    school: 'Illusion',
    unit: 'pts',
  },
  REAT: {
    availableEquipment: [],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 38.0,
    description: "Restore target's named attribute.",
    id: 'REAT',
    name: 'Restore Attribute',
    school: 'Restoration',
    selectableAttribute: true,
    unit: 'pts',
  },
  REDG: {
    availableEquipment: [],
    availableParameters: ['Magnitude', 'Duration'],
    barterFactor: 400,
    baseCost: 2.5,
    description: 'Reflect any weapon damage back at the attacker.',
    id: 'REDG',
    name: 'Reflect Damage',
    school: 'Mysticism',
    unit: 'pts',
  },
  REFA: {
    availableEquipment: [],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 2.0,
    description: "Restore target's Fatigue.",
    id: 'REFA',
    name: 'Restore Fatigue',
    school: 'Restoration',
    unit: 'pts',
  },
  REHE: {
    availableEquipment: [],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 10.0,
    description: "Restore target's Health.",
    id: 'REHE',
    name: 'Restore Health',
    school: 'Restoration',
    unit: 'pts',
  },
  RESP: {
    availableEquipment: [],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 2.5,
    description: "Restore target's Magicka.",
    id: 'RESP',
    name: 'Restore Magicka',
    school: 'Restoration',
    unit: 'pts',
  },
  RFLC: {
    availableEquipment: [],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 400,
    baseCost: 3.5,
    description: 'Reflect any spell effect back at the caster.',
    id: 'RFLC',
    name: 'Reflect Spell',
    school: 'Mysticism',
    unit: 'pts',
  },
  RSDI: {
    availableEquipment: [],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 15,
    baseCost: 0.5,
    description: "Increase target's resistance to common disease.",
    id: 'RSDI',
    name: 'Resist Disease',
    school: 'Restoration',
    unit: 'pts',
  },
  RSFI: {
    availableEquipment: [],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 50,
    baseCost: 0.5,
    description: "Increase target's resistance to damage from elemental fire.",
    id: 'RSFI',
    name: 'Resist Fire',
    school: 'Restoration',
    unit: 'pts',
  },
  RSFR: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 50,
    baseCost: 0.5,
    constantEffectFactor: 5,
    description: "Increase target's resistance to damage from elemental frost.",
    id: 'RSFR',
    name: 'Resist Frost',
    school: 'Restoration',
    unit: 'pts',
  },
  RSMA: {
    availableEquipment: [],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 150,
    baseCost: 2.0,
    description: "Increase target's resistance to magic.",
    id: 'RSMA',
    name: 'Resist Magic',
    school: 'Restoration',
    unit: 'pts',
  },
  RSNW: {
    availableEquipment: [],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 300,
    baseCost: 1.5,
    description: "Increase target's resistance to damage from normal weapons.",
    id: 'RSNW',
    name: 'Resist Normal Weapons',
    school: 'Restoration',
    unit: 'pts',
  },
  RSPA: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 30,
    baseCost: 0.75,
    constantEffectFactor: 5,
    description: "Increase target's resistance to paralysis.",
    id: 'RSPA',
    name: 'Resist Paralysis',
    school: 'Restoration',
    unit: 'pts',
  },
  RSPO: {
    availableEquipment: [],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 15,
    baseCost: 0.5,
    description: "Increase target's resistance to damage from poison.",
    id: 'RSPO',
    name: 'Resist Poison',
    school: 'Restoration',
    unit: 'pts',
  },
  RSSH: {
    availableEquipment: [],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 50,
    baseCost: 0.5,
    description: "Increase target's resistance to damage from elemental shock.",
    id: 'RSSH',
    name: 'Resist Shock',
    school: 'Restoration',
    unit: 'pts',
  },
  SABS: {
    availableEquipment: [],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 400,
    baseCost: 3.0,
    description: "Turns incoming spell's power into equal Magicka increase.",
    id: 'SABS',
    name: 'Spell Absorption',
    school: 'Mysticism',
    unit: 'pts',
  },
  SHDG: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 7.8,
    constantEffectFactor: 0,
    description: 'Produce a manifestation of elemental shock.',
    id: 'SHDG',
    isCursedEnchantment: true,
    name: 'Shock Damage',
    school: 'Destruction',
    unit: 'pts',
  },
  SHLD: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 100,
    baseCost: 0.45,
    constantEffectFactor: 1,
    description: "Creates a magical shield that contributes to target's armor rating.",
    id: 'SHLD',
    name: 'Shield',
    school: 'Alteration',
    unit: 'pts',
  },
  SLNC: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Area', 'Duration'],
    barterFactor: 0,
    baseCost: 60.0,
    description: 'Render target incapable of casting spells.',
    id: 'SLNC',
    isFlatCostConstantEffect: true,
    name: 'Silence',
    school: 'Illusion',
    unit: 'pts',
  },
  STRP: {
    availableEquipment: ['Weapon'],
    availableParameters: ['Area', 'Duration'],
    barterFactor: 0,
    baseCost: 30,
    description: "Traps target's soul in the smallest possible soul gem.",
    id: 'STRP',
    name: 'Soul Trap',
    school: 'Mysticism',
    unit: 'pts',
  },
  TELE: {
    availableEquipment: [],
    availableParameters: ['Magnitude', 'Duration'],
    barterFactor: 0,
    baseCost: 0.49,
    description: 'Allows you to pick up an item from a distance.',
    id: 'TELE',
    name: 'Telekinesis',
    school: 'Mysticism',
    unit: 'pts',
  },
  TURN: {
    availableEquipment: ['Weapon'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.083,
    description: "Decrease undead creature's Confidence (willingness to fight).",
    id: 'TURN',
    isLevelBasedMagnitude: true,
    name: 'Turn Undead',
    school: 'Conjuration',
    unit: 'lvl',
  },
  WABR: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Area', 'Duration'],
    barterFactor: 400,
    baseCost: 14.5,
    description: 'Lets the target breathe underwater.',
    id: 'WABR',
    isFlatCostConstantEffect: true,
    name: 'Water Breathing',
    school: 'Alteration',
    unit: 'pts',
  },
  WAWA: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Area', 'Duration'],
    barterFactor: 400,
    baseCost: 13.0,
    description: 'Lets the target walk on water.',
    id: 'WAWA',
    isFlatCostConstantEffect: true,
    name: 'Water Walking',
    school: 'Alteration',
    unit: 'pts',
  },
  WKDI: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.12,
    constantEffectFactor: 0,
    description: "Decrease target's resistance to common disease.",
    id: 'WKDI',
    isCursedEnchantment: true,
    name: 'Weakness to Disease',
    school: 'Destruction',
    unit: 'pts',
  },
  WKFI: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.1,
    constantEffectFactor: 0,
    description: "Decrease target's resistance to elemental fire.",
    id: 'WKFI',
    isCursedEnchantment: true,
    name: 'Weakness to Fire',
    school: 'Destruction',
    unit: 'pts',
  },
  WKFR: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.1,
    constantEffectFactor: 0,
    description: "Decrease target's resistance to elemental frost.",
    id: 'WKFR',
    isCursedEnchantment: true,
    name: 'Weakness to Frost',
    school: 'Destruction',
    unit: 'pts',
  },
  WKMA: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.25,
    constantEffectFactor: 0,
    description: "Decrease target's resistance to magic.",
    id: 'WKMA',
    isCursedEnchantment: true,
    name: 'Weakness to Magic',
    school: 'Destruction',
    unit: 'pts',
  },
  WKNW: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.25,
    constantEffectFactor: 0,
    description: "Decrease target's resistance to normal weapons.",
    id: 'WKNW',
    isCursedEnchantment: true,
    name: 'Weakness to Normal Weapons',
    school: 'Destruction',
    unit: 'pts',
  },
  WKPO: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.1,
    constantEffectFactor: 0,
    description: "Decrease target's resistance to poison.",
    id: 'WKPO',
    isCursedEnchantment: true,
    name: 'Weakness to Poison',
    school: 'Destruction',
    unit: 'pts',
  },
  WKSH: {
    availableEquipment: ['Weapon', 'Worn'],
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    barterFactor: 0,
    baseCost: 0.1,
    constantEffectFactor: 0,
    description: "Decrease target's resistance to elemental shock.",
    id: 'WKSH',
    isCursedEnchantment: true,
    name: 'Weakness to Shock',
    school: 'Destruction',
    unit: 'pts',
  },
  Z001: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 13.0,
    description: "Summons Rufio's Ghost. (Used in a Dark Brotherhood quest.)",
    id: 'Z001',
    name: "Summon Rufio's Ghost",
    school: 'Conjuration',
    unit: 'pts',
  },
  Z002: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 33.3,
    description: 'Summons Ancestor Guardian. (Dunmer racial ability)',
    id: 'Z002',
    name: 'Summon Ancestor Guardian',
    school: 'Conjuration',
    unit: 'pts',
  },
  Z003: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 45.0,
    description: 'Summons Spiderling. (Used by Spider Daedra)',
    id: 'Z003',
    name: 'Summon Spiderling',
    school: 'Conjuration',
    unit: 'pts',
  },
  Z004: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 1,
    description: 'Summons Spiderling. (Used by Spider Daedra)',
    id: 'Z004',
    name: 'Summon Flesh Atronach',
    school: 'Conjuration',
    unit: 'pts',
  },
  Z005: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 47.3,
    description:
      'Summons Bear. (Used by Spriggans, available to the player with the Spell Tomes official plug-in.)',
    id: 'Z005',
    name: 'Summon Bear',
    school: 'Conjuration',
    unit: 'pts',
  },
  Z006: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 61,
    description: 'Summons Gluttonous Hunger.',
    id: 'Z006',
    name: 'Summon Gluttonous Hunger',
    school: 'Conjuration',
    unit: 'pts',
  },
  Z007: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 123.33,
    description: 'Summons Ravenous Hunger.',
    id: 'Z007',
    name: 'Summon Ravenous Hunger',
    school: 'Conjuration',
    unit: 'pts',
  },
  Z008: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 175,
    description: 'Summons Ravenous Hunger.',
    id: 'Z008',
    name: 'Summon Voracious Hunger',
    school: 'Conjuration',
    unit: 'pts',
  },
  Z009: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 1,
    description: 'Summons Dark Seducer.',
    id: 'Z009',
    name: 'Summon Dark Seducer',
    school: 'Conjuration',
    unit: 'pts',
  },
  Z010: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 1,
    description: 'Summons Golden Saint.',
    id: 'Z010',
    name: 'Summon Golden Saint',
    school: 'Conjuration',
    unit: 'pts',
  },
  Z012: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 45,
    description: 'Summons Decrepit Shambles.',
    id: 'Z012',
    name: 'Summon Decrepit Shambles',
    school: 'Conjuration',
    unit: 'pts',
  },
  Z013: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 87.5,
    description: 'Summons Shambles.',
    id: 'Z013',
    name: 'Summon Shambles',
    school: 'Conjuration',
    unit: 'pts',
  },
  Z014: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 150,
    description: 'Summons Replete Shambles.',
    id: 'Z014',
    name: 'Summon Replete Shambles',
    school: 'Conjuration',
    unit: 'pts',
  },
  Z015: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 22,
    description: 'Summons Hunger.',
    id: 'Z015',
    name: 'Summon Hunger',
    school: 'Conjuration',
    unit: 'pts',
  },
  ZCLA: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 75.56,
    description: 'Summons Clannfear.',
    id: 'ZCLA',
    name: 'Summon Clannfear',
    school: 'Conjuration',
    unit: 'pts',
  },
  ZDAE: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 123.33,
    description: 'Summons Daedroth.',
    id: 'ZDAE',
    name: 'Summon Daedroth',
    school: 'Conjuration',
    unit: 'pts',
  },
  ZDRE: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 72.5,
    description: 'Summons Dremora.',
    id: 'ZDRE',
    name: 'Summon Dremora',
    school: 'Conjuration',
    unit: 'pts',
  },
  ZDRL: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 157.14,
    description: 'Summons Dremora Lord.',
    id: 'ZDRL',
    name: 'Summon Dremora Lord',
    school: 'Conjuration',
    unit: 'pts',
  },
  ZFIA: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 45.0,
    description: 'Summons Flame Atronach.',
    id: 'ZFIA',
    name: 'Summon Flame Atronach',
    school: 'Conjuration',
    unit: 'pts',
  },
  ZFRA: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 102.86,
    description: 'Summons Frost Atronach.',
    id: 'ZFRA',
    name: 'Summon Frost Atronach',
    school: 'Conjuration',
    unit: 'pts',
  },
  ZGHO: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 22.0,
    description: 'Summons Ghost.',
    id: 'ZGHO',
    name: 'Summon Ghost',
    school: 'Conjuration',
    unit: 'pts',
  },
  ZHDZ: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 56.0,
    description: 'Summons Headless Zombie.',
    id: 'ZHDZ',
    name: 'Summon Headless Zombie',
    school: 'Conjuration',
    unit: 'pts',
  },
  ZSCA: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 30.0,
    description: 'Summons Scamp.',
    id: 'ZSCA',
    name: 'Summon Scamp',
    school: 'Conjuration',
    unit: 'pts',
  },
  ZSKA: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 32.5,
    description: 'Summons Skeleton Guardian.',
    id: 'ZSKA',
    name: 'Summon Skeleton Guardian',
    school: 'Conjuration',
    unit: 'pts',
  },
  ZSKC: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 152.0,
    description: 'Summons Skeleton Champion.',
    id: 'ZSKC',
    name: 'Summon Skeleton Champion',
    school: 'Conjuration',
    unit: 'pts',
  },
  ZSKE: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 11.25,
    description: 'Summons Skeleton.',
    id: 'ZSKE',
    name: 'Summon Skeleton',
    school: 'Conjuration',
    unit: 'pts',
  },
  ZSKH: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 66.0,
    description: 'Summons Skeleton Hero.',
    id: 'ZSKH',
    name: 'Summon Skeleton Hero',
    school: 'Conjuration',
    unit: 'pts',
  },
  ZSPD: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 195.0,
    description: 'Summons Spider Daedra.',
    id: 'ZSPD',
    name: 'Summon Spider Daedra',
    school: 'Conjuration',
    unit: 'pts',
  },
  ZSTA: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 125.0,
    description: 'Summons Storm Atronach.',
    id: 'ZSTA',
    name: 'Summon Storm Atronach',
    school: 'Conjuration',
    unit: 'pts',
  },
  ZWRA: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 87.5,
    description: 'Summons Faded Wraith.',
    id: 'ZWRA',
    name: 'Summon Faded Wraith',
    school: 'Conjuration',
    unit: 'pts',
  },
  ZWRL: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 260.0,
    description: 'Summons Gloom Wraith.',
    id: 'ZWRL',
    name: 'Summon Gloom Wraith',
    school: 'Conjuration',
    unit: 'pts',
  },
  ZXIV: {
    availableEquipment: [],
    availableParameters: ['Duration'],
    barterFactor: 0,
    baseCost: 200.0,
    description: 'Summons Xivilai.',
    id: 'ZXIV',
    name: 'Summon Xivilai',
    school: 'Conjuration',
    unit: 'pts',
  },
};

export const spellEffectDefinitions: SpellEffectDefinition[] = Object.values(
  spellEffectDefinitionById,
).sort((a, b) => {
  return a.name.localeCompare(b.name);
});

export const wornSpellEffectDefinitions = spellEffectDefinitions.filter((effect) =>
  effect.availableEquipment.includes('Worn'),
);
export const weaponSpellEffectDefinitions = spellEffectDefinitions.filter((effect) =>
  effect.availableEquipment.includes('Weapon'),
);

// https://en.uesp.net/wiki/Oblivion:Magical_Effects#Magnitude_to_Level_Conversion
const LEVEL_TO_MAGNITUDE_MULTIPLIER = 4;

// https://en.uesp.net/wiki/Oblivion:Spell_Making#Spell_Cost
export function getMagickaCost({
  baseCost,
  magnitude,
  duration,
  area,
  isLevelBasedMagnitude,
}: {
  baseCost: number;
  magnitude: number;
  duration: number;
  area: number;
  isLevelBasedMagnitude?: boolean;
}): number {
  const adjustedMagnitude = isLevelBasedMagnitude
    ? magnitude * LEVEL_TO_MAGNITUDE_MULTIPLIER
    : magnitude;
  const B = baseCost / 10;
  const M = Math.max(adjustedMagnitude ** 1.28, 1);
  const D = Math.max(duration, 1);
  const A = Math.max(area * 0.15, 1);
  return Math.floor(Math.max(B * M * D * A, 1));
}

const GOLD_MULTIPLIER = 10;
const constantEffectCostOverrides: Partial<Record<SpellEffectDefinitionId, number>> = {
  NEYE: 100,
  WABR: 2000,
  WAWA: 2000,
};
export function getGoldCost({
  equipmentType,
  soulGem,
  effect,
}: {
  equipmentType: EquipmentType;
  soulGem: SoulGem;
  effect: SpellEffect;
}): number {
  const definition = spellEffectDefinitionById[effect.id];

  // We use a different formula for worn equipment
  if (equipmentType !== 'Worn') {
    const magickaCost = getMagickaCost({
      baseCost: definition.baseCost,
      magnitude: effect.magnitude,
      area: effect.area,
      duration: effect.duration,
      isLevelBasedMagnitude: definition.isLevelBasedMagnitude,
    });

    // Weapon computation
    return Math.floor(magickaCost * GOLD_MULTIPLIER);
  }

  const magnitude = getConstantEffectMagnitude(effect.id, soulGem);

  // Special exceptions for some spell effects
  if (constantEffectCostOverrides[effect.id]) {
    return constantEffectCostOverrides[effect.id] ?? 0;
  }

  // Cursed, worn enchantments are free to craft
  if (definition.isCursedEnchantment) {
    return 0;
  }

  return Math.floor(magnitude * definition.barterFactor);
}

export function getMasteryFromMagickaCost(magickaCost: number): Mastery {
  if (magickaCost < 26) return 'Novice';
  if (magickaCost < 63) return 'Apprentice';
  if (magickaCost < 150) return 'Journeyman';
  if (magickaCost < 400) return 'Expert';
  return 'Master';
}

export function getMinLevelForMastery(mastery: Mastery): number {
  if (mastery === 'Novice') return 0;
  if (mastery === 'Apprentice') return 25;
  if (mastery === 'Journeyman') return 50;
  if (mastery === 'Expert') return 75;
  return 100;
}
