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
export const MIN_AREA = 10;
export const MIN_DURATION = 1;
export const MAX_MAGNITUDE = 100;
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
  id: SpellEffectDefinitionId;
  name: SpellEffectName;
  baseCost: number;
  barterFactor: number;
  description: string;
  school: School;
  selectableLockLevel?: boolean;
  selectableAttribute?: boolean;
  selectableSkill?: boolean;
  constantEffectFactor?: number;
  availableParameters: SpellEffectParameter[];
  availableEquipment: EquipmentType[];
  unit: string;
  isCursedEnchantment?: boolean;
  isFlatCostConstantEffect?: boolean;
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
    id: 'ABAT',
    school: 'Restoration',
    name: 'Absorb Attribute',
    baseCost: 0.95,
    barterFactor: 0,
    selectableAttribute: true,
    description: "Transfer a portion of target's named attribute to you.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon'],
    unit: 'pts',
  },
  ABFA: {
    id: 'ABFA',
    school: 'Restoration',
    name: 'Absorb Fatigue',
    baseCost: 6,
    barterFactor: 0,
    description: "Transfer a portion of target's Fatigue to you.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon'],
    unit: 'pts',
  },
  ABHE: {
    id: 'ABHE',
    school: 'Restoration',
    name: 'Absorb Health',
    baseCost: 16,
    barterFactor: 0,
    description: "Transfer a portion of target's Health to you.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon'],
    unit: 'pts',
  },
  ABSK: {
    id: 'ABSK',
    school: 'Restoration',
    name: 'Absorb Skill',
    baseCost: 2.1,
    barterFactor: 0,
    selectableSkill: true,
    description: "Transfer a portion of target's named skill to you.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon'],
    unit: 'pts',
  },
  ABSP: {
    id: 'ABSP',
    school: 'Restoration',
    name: 'Absorb Magicka',
    baseCost: 7.5,
    barterFactor: 0,
    description: "Transfer a portion of target's Magicka to you.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon'],
    unit: 'pts',
  },
  BABO: {
    id: 'BABO',
    name: 'Bound Boots',
    school: 'Conjuration',
    baseCost: 12.0,
    barterFactor: 0,
    description: 'Conjures a pair of Daedric Boots. (Light Armor)',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  BACU: {
    id: 'BACU',
    name: 'Bound Cuirass',
    school: 'Conjuration',
    baseCost: 12.0,
    barterFactor: 0,
    description: 'Conjures a Daedric Cuirass. (Heavy Armor)',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  BAGA: {
    id: 'BAGA',
    name: 'Bound Gauntlets',
    school: 'Conjuration',
    baseCost: 8.0,
    barterFactor: 0,
    description: 'Conjures a pair of Daedric Gauntlets. (Light Armor)',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  BAGR: {
    id: 'BAGR',
    name: 'Bound Greaves',
    school: 'Conjuration',
    baseCost: 12.0,
    barterFactor: 0,
    description: 'Conjures a pair of Daedric Greaves. (Heavy Armor)',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  BAHE: {
    id: 'BAHE',
    name: 'Bound Helmet',
    school: 'Conjuration',
    baseCost: 12.0,
    barterFactor: 0,
    description: 'Conjures a Daedric Helmet. (Light Armor)',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  BASH: {
    id: 'BASH',
    name: 'Bound Shield',
    school: 'Conjuration',
    baseCost: 18.0,
    barterFactor: 0,
    description: 'Conjures a Daedric Shield. (Light Armor)',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  BRDN: {
    id: 'BRDN',
    name: 'Burden',
    school: 'Alteration',
    baseCost: 0.21,
    barterFactor: 0,
    description: "Reduce the target's maximum encumbrance.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    constantEffectFactor: 0,
    availableEquipment: ['Weapon', 'Worn'],
    isCursedEnchantment: true,
    unit: 'pts',
  },
  BWAX: {
    id: 'BWAX',
    name: 'Bound Axe',
    school: 'Conjuration',
    baseCost: 39.0,
    barterFactor: 0,
    description: 'Conjures a Daedric Axe. (Blunt One Hand, Speed: 1.1, Reach: 0.8, Damage: 18)',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  BWBO: {
    id: 'BWBO',
    name: 'Bound Bow',
    school: 'Conjuration',
    baseCost: 95.0,
    barterFactor: 0,
    description: 'Conjures a Daedric Bow. (Marksmanship, Speed: 1.0, Damage: 15)',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  BWDA: {
    id: 'BWDA',
    name: 'Bound Dagger',
    school: 'Conjuration',
    baseCost: 14.0,
    barterFactor: 0,
    description: 'Conjures a Daedric Dagger. (Blade One Hand, Speed: 1.4, Reach: 0.6, Damage: 13)',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  BWMA: {
    id: 'BWMA',
    name: 'Bound Mace',
    school: 'Conjuration',
    baseCost: 91.0,
    barterFactor: 0,
    description: 'Conjures a Daedric Mace. (Blunt One Hand, Speed: 0.9, Reach: 1.0, Damage: 22)',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  BWSW: {
    id: 'BWSW',
    name: 'Bound Sword',
    school: 'Conjuration',
    baseCost: 235.0,
    barterFactor: 0,
    description:
      'Conjures a Daedric Claymore. (Blade Two Hand, Speed: 0.8, Reach: 1.3, Damage: 29)',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  CALM: {
    id: 'CALM',
    school: 'Illusion',
    name: 'Calm',
    baseCost: 0.47,
    barterFactor: 0,
    description: "Decrease target's Aggression (inclination to attack).",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  CHML: {
    id: 'CHML',
    school: 'Illusion',
    name: 'Chameleon',
    baseCost: 0.63,
    barterFactor: 65,
    description:
      'Blend into the surroundings. Similar to Invisibility, but not perfect, unless you use 100% Chameleon. However, the effect stays if you attack or do another action.',
    constantEffectFactor: 3,
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    unit: 'pts',
  },
  CHRM: {
    id: 'CHRM',
    school: 'Illusion',
    name: 'Charm',
    baseCost: 0.2,
    barterFactor: 0,
    description: "Increase target's disposition.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  COCR: {
    id: 'COCR',
    school: 'Illusion',
    name: 'Command Creature',
    baseCost: 0.6,
    barterFactor: 0,
    description: 'Make targeted creature fight for you.',
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon'],
    unit: 'pts',
  },
  COHU: {
    id: 'COHU',
    school: 'Illusion',
    name: 'Command Humanoid',
    baseCost: 0.75,
    barterFactor: 0,
    description: 'Make targeted humanoid fight for you.',
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  CUDI: {
    id: 'CUDI',
    school: 'Restoration',
    name: 'Cure Disease',
    baseCost: 1400,
    barterFactor: 0,
    description: 'Cures common disease.',
    availableParameters: ['Area'],
    availableEquipment: [],
    unit: 'pts',
  },
  CUPA: {
    id: 'CUPA',
    school: 'Restoration',
    name: 'Cure Paralysis',
    baseCost: 500,
    barterFactor: 0,
    description: 'Cures paralyzation.',
    availableParameters: ['Area'],
    availableEquipment: [],
    unit: 'pts',
  },
  CUPO: {
    id: 'CUPO',
    school: 'Restoration',
    name: 'Cure Poison',
    baseCost: 600,
    barterFactor: 0,
    description: 'Cures poisoning.',
    availableParameters: ['Area'],
    availableEquipment: [],
    unit: 'pts',
  },
  DEMO: {
    id: 'DEMO',
    school: 'Illusion',
    name: 'Demoralize',
    baseCost: 0.49,
    barterFactor: 0,
    description: "Decrease target's Confidence (willingness to fight).",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon'],
    unit: 'pts',
  },
  DGAT: {
    id: 'DGAT',
    name: 'Damage Attribute',
    school: 'Destruction',
    baseCost: 100.0,
    barterFactor: 0,
    selectableAttribute: true,
    constantEffectFactor: 0,
    description: "Damages target's named attribute.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    isCursedEnchantment: true,
    unit: 'pts',
  },
  DGFA: {
    id: 'DGFA',
    name: 'Damage Fatigue',
    school: 'Destruction',
    baseCost: 4.4,
    barterFactor: 0,
    constantEffectFactor: 0,
    description: "Damages target's Fatigue.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    isCursedEnchantment: true,
    unit: 'pts',
  },
  DGHE: {
    id: 'DGHE',
    school: 'Destruction',
    name: 'Damage Health',
    baseCost: 12.0,
    barterFactor: 0,
    constantEffectFactor: 0,
    description: "Damages target's Health.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    isCursedEnchantment: true,
    unit: 'pts',
  },
  DGSP: {
    id: 'DGSP',
    school: 'Destruction',
    name: 'Damage Magicka',
    baseCost: 2.45,
    barterFactor: 0,
    constantEffectFactor: 0,
    description: "Damages target's Magicka.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    isCursedEnchantment: true,
    unit: 'pts',
  },
  DIAR: {
    id: 'DIAR',
    school: 'Destruction',
    name: 'Disintegrate Armor',
    baseCost: 6.2,
    barterFactor: 0,
    constantEffectFactor: 0,
    description: 'Damage the Health of equipped armor.',
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    isCursedEnchantment: true,
    unit: 'pts',
  },
  DIWE: {
    id: 'DIWE',
    school: 'Destruction',
    name: 'Disintegrate Weapon',
    baseCost: 6.2,
    barterFactor: 0,
    constantEffectFactor: 0,
    description: 'Damage the Health of an equipped weapon.',
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    isCursedEnchantment: true,
    unit: 'pts',
  },
  DRAT: {
    id: 'DRAT',
    school: 'Destruction',
    name: 'Drain Attribute',
    baseCost: 0.7,
    barterFactor: 0,
    selectableAttribute: true,
    constantEffectFactor: 0,
    description: "Temporarily lowers target's named attribute.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    isCursedEnchantment: true,
    unit: 'pts',
  },
  DRFA: {
    id: 'DRFA',
    school: 'Destruction',
    name: 'Drain Fatigue',
    baseCost: 0.18,
    barterFactor: 0,
    constantEffectFactor: 0,
    description: "Temporarily lowers target's Fatigue.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    isCursedEnchantment: true,
    unit: 'pts',
  },
  DRHE: {
    id: 'DRHE',
    school: 'Destruction',
    name: 'Drain Health',
    baseCost: 0.9,
    barterFactor: 0,
    constantEffectFactor: 0,
    description: "Temporarily lowers target's Health.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    isCursedEnchantment: true,
    unit: 'pts',
  },
  DRSK: {
    id: 'DRSK',
    school: 'Destruction',
    name: 'Drain Skill',
    baseCost: 0.65,
    barterFactor: 0,
    selectableSkill: true,
    constantEffectFactor: 0,
    description: "Temporarily lowers target's named skill.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    isCursedEnchantment: true,
    unit: 'pts',
  },
  DRSP: {
    id: 'DRSP',
    school: 'Destruction',
    name: 'Drain Magicka',
    baseCost: 0.18,
    barterFactor: 0,
    constantEffectFactor: 0,
    description: "Temporarily lowers target's Magicka.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    isCursedEnchantment: true,
    unit: 'pts',
  },
  DSPL: {
    id: 'DSPL',
    school: 'Mysticism',
    name: 'Dispel',
    baseCost: 3.6,
    barterFactor: 0,
    description: 'Remove Magicka-based spell effects from the target.',
    availableParameters: ['Magnitude', 'Area'],
    availableEquipment: ['Weapon'],
    unit: 'pts',
  },
  DTCT: {
    id: 'DTCT',
    school: 'Mysticism',
    name: 'Detect Life',
    baseCost: 0.08,
    barterFactor: 15,
    constantEffectFactor: 3,
    description: 'Allows to see living things through solid objects.',
    availableParameters: ['Magnitude', 'Duration'],
    availableEquipment: ['Worn'],
    unit: 'ft',
  },
  FIDG: {
    id: 'FIDG',
    school: 'Destruction',
    name: 'Fire Damage',
    baseCost: 7.5,
    barterFactor: 0,
    constantEffectFactor: 0,
    description: 'Produce a manifestation of elemental fire.',
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    isCursedEnchantment: true,
    unit: 'pts',
  },
  FISH: {
    id: 'FISH',
    name: 'Fire Shield',
    school: 'Alteration',
    baseCost: 0.95,
    barterFactor: 100,
    constantEffectFactor: 1,
    description: "Creates a fire shield (armor points + fire resistance) around the target's body.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    unit: 'pts',
  },
  FOAT: {
    id: 'FOAT',
    school: 'Restoration',
    name: 'Fortify Attribute',
    baseCost: 0.6,
    barterFactor: 100,
    selectableAttribute: true,
    constantEffectFactor: 1,
    description: "Increase the value of target's named attribute.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    unit: 'pts',
  },
  FOFA: {
    id: 'FOFA',
    school: 'Restoration',
    name: 'Fortify Fatigue',
    baseCost: 0.04,
    barterFactor: 25,
    constantEffectFactor: 4,
    description: "Increase the value of target's Fatigue.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    unit: 'pts',
  },
  FOHE: {
    id: 'FOHE',
    school: 'Restoration',
    name: 'Fortify Health',
    baseCost: 0.14,
    barterFactor: 150,
    constantEffectFactor: 1,
    description: "Increase the value of target's Health.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    unit: 'pts',
  },
  FOSK: {
    id: 'FOSK',
    school: 'Restoration',
    name: 'Fortify Skill',
    baseCost: 0.6,
    barterFactor: 100,
    selectableSkill: true,
    constantEffectFactor: 1,
    description: "Increase the value of target's named skill.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    unit: 'pts',
  },
  FOSP: {
    id: 'FOSP',
    school: 'Restoration',
    name: 'Fortify Magicka',
    baseCost: 0.15,
    barterFactor: 100,
    constantEffectFactor: 4,
    description: "Increase the value of target's Magicka.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    unit: 'pts',
  },
  FRDG: {
    id: 'FRDG',
    school: 'Destruction',
    name: 'Frost Damage',
    baseCost: 7.4,
    barterFactor: 0,
    constantEffectFactor: 0,
    description: 'Produce a manifestation of elemental frost.',
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    unit: 'pts',
  },
  FRNZ: {
    id: 'FRNZ',
    school: 'Illusion',
    name: 'Frenzy',
    baseCost: 0.04,
    barterFactor: 0,
    description: "Increase target's Aggression (inclination to attack).",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon'],
    unit: 'pts',
  },
  FRSH: {
    id: 'FRSH',
    name: 'Frost Shield',
    school: 'Alteration',
    baseCost: 0.95,
    barterFactor: 100,
    constantEffectFactor: 1,
    description:
      "Creates a frost shield (armor points + frost resistance) around the target's body.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    unit: 'pts',
  },
  FTHR: {
    id: 'FTHR',
    name: 'Feather',
    school: 'Alteration',
    baseCost: 0.01,
    barterFactor: 25,
    constantEffectFactor: 9,
    description: "Increase the target's maximum encumbrance.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    unit: 'pts',
  },
  INVI: {
    id: 'INVI',
    school: 'Illusion',
    name: 'Invisibility',
    baseCost: 40.0,
    barterFactor: 0,
    description:
      'Makes the target invisible but not inaudible. The effect dissipates if the target does anything but move e.g attack or pickpocket.',
    availableParameters: ['Area', 'Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  LGHT: {
    id: 'LGHT',
    school: 'Illusion',
    name: 'Light',
    baseCost: 0.051,
    barterFactor: 12.5,
    constantEffectFactor: 7,
    description: 'Illuminates the target.',
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    unit: 'ft',
  },
  LISH: {
    id: 'LISH',
    name: 'Shock Shield',
    school: 'Alteration',
    baseCost: 0.95,
    barterFactor: 100,
    constantEffectFactor: 1,
    description:
      "Creates a shock shield (armor points + shock resistance) around the target's body.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    unit: 'pts',
  },
  NEYE: {
    id: 'NEYE',
    school: 'Illusion',
    name: 'Night-Eye',
    baseCost: 22.0,
    barterFactor: 20,
    description: 'Ability to see in the dark.',
    availableParameters: [],
    availableEquipment: ['Worn'],
    unit: 'pts',
    isFlatCostConstantEffect: true,
  },
  OPEN: {
    id: 'OPEN',
    name: 'Open',
    school: 'Alteration',
    baseCost: 4.3,
    barterFactor: 0,
    selectableLockLevel: true,
    description: 'Opens a locked container or door.',
    availableParameters: ['Area'],
    availableEquipment: [],
    unit: 'pts',
  },
  PARA: {
    id: 'PARA',
    school: 'Illusion',
    name: 'Paralyze',
    baseCost: 475,
    barterFactor: 0,
    description: 'Render target unable to move.',
    availableParameters: ['Area', 'Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  RALY: {
    id: 'RALY',
    school: 'Illusion',
    name: 'Rally',
    baseCost: 0.03,
    barterFactor: 0,
    description: "Increase target's Confidence (willingness to attack).",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon'],
    unit: 'pts',
  },
  REAT: {
    id: 'REAT',
    school: 'Restoration',
    name: 'Restore Attribute',
    baseCost: 38.0,
    barterFactor: 0,
    selectableAttribute: true,
    description: "Restore target's named attribute.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  REDG: {
    id: 'REDG',
    school: 'Mysticism',
    name: 'Reflect Damage',
    baseCost: 2.5,
    barterFactor: 400,
    description: 'Reflect any weapon damage back at the attacker.',
    availableParameters: ['Magnitude', 'Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  REFA: {
    id: 'REFA',
    school: 'Restoration',
    name: 'Restore Fatigue',
    baseCost: 2.0,
    barterFactor: 0,
    description: "Restore target's Fatigue.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  REHE: {
    id: 'REHE',
    school: 'Restoration',
    name: 'Restore Health',
    baseCost: 10.0,
    barterFactor: 0,
    description: "Restore target's Health.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  RESP: {
    id: 'RESP',
    school: 'Restoration',
    name: 'Restore Magicka',
    baseCost: 2.5,
    barterFactor: 0,
    description: "Restore target's Magicka.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  RFLC: {
    id: 'RFLC',
    school: 'Mysticism',
    name: 'Reflect Spell',
    baseCost: 3.5,
    barterFactor: 400,
    description: 'Reflect any spell effect back at the caster.',
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  RSDI: {
    id: 'RSDI',
    school: 'Restoration',
    name: 'Resist Disease',
    baseCost: 0.5,
    barterFactor: 15,
    description: "Increase target's resistance to common disease.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  RSFI: {
    id: 'RSFI',
    school: 'Restoration',
    name: 'Resist Fire',
    baseCost: 0.5,
    barterFactor: 50,
    description: "Increase target's resistance to damage from elemental fire.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  RSFR: {
    id: 'RSFR',
    school: 'Restoration',
    name: 'Resist Frost',
    baseCost: 0.5,
    barterFactor: 50,
    constantEffectFactor: 5,
    description: "Increase target's resistance to damage from elemental frost.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    unit: 'pts',
  },
  RSMA: {
    id: 'RSMA',
    school: 'Restoration',
    name: 'Resist Magic',
    baseCost: 2.0,
    barterFactor: 150,
    description: "Increase target's resistance to magic.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  RSNW: {
    id: 'RSNW',
    school: 'Restoration',
    name: 'Resist Normal Weapons',
    baseCost: 1.5,
    barterFactor: 300,
    description: "Increase target's resistance to damage from normal weapons.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  RSPA: {
    id: 'RSPA',
    school: 'Restoration',
    name: 'Resist Paralysis',
    baseCost: 0.75,
    barterFactor: 30,
    constantEffectFactor: 5,
    description: "Increase target's resistance to paralysis.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    unit: 'pts',
  },
  RSPO: {
    id: 'RSPO',
    school: 'Restoration',
    name: 'Resist Poison',
    baseCost: 0.5,
    barterFactor: 15,
    description: "Increase target's resistance to damage from poison.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  RSSH: {
    id: 'RSSH',
    school: 'Restoration',
    name: 'Resist Shock',
    baseCost: 0.5,
    barterFactor: 50,
    description: "Increase target's resistance to damage from elemental shock.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  SABS: {
    id: 'SABS',
    school: 'Mysticism',
    name: 'Spell Absorption',
    baseCost: 3.0,
    barterFactor: 400,
    description: "Turns incoming spell's power into equal Magicka increase.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  SHDG: {
    id: 'SHDG',
    school: 'Destruction',
    name: 'Shock Damage',
    baseCost: 7.8,
    barterFactor: 0,
    constantEffectFactor: 0,
    description: 'Produce a manifestation of elemental shock.',
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    isCursedEnchantment: true,
    unit: 'pts',
  },
  SHLD: {
    id: 'SHLD',
    name: 'Shield',
    school: 'Alteration',
    baseCost: 0.45,
    barterFactor: 100,
    constantEffectFactor: 1,
    description: "Creates a magical shield that contributes to target's armor rating.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    unit: 'pts',
  },
  SLNC: {
    id: 'SLNC',
    school: 'Illusion',
    name: 'Silence',
    baseCost: 60.0,
    barterFactor: 0,
    description: 'Render target incapable of casting spells.',
    availableParameters: ['Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    unit: 'pts',
    isFlatCostConstantEffect: true,
  },
  STRP: {
    id: 'STRP',
    school: 'Mysticism',
    name: 'Soul Trap',
    baseCost: 30,
    barterFactor: 0,
    description: "Traps target's soul in the smallest possible soul gem.",
    availableParameters: ['Area', 'Duration'],
    availableEquipment: ['Weapon'],
    unit: 'pts',
  },
  TELE: {
    id: 'TELE',
    school: 'Mysticism',
    name: 'Telekinesis',
    baseCost: 0.49,
    barterFactor: 0,
    description: 'Allows you to pick up an item from a distance.',
    availableParameters: ['Magnitude', 'Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  TURN: {
    id: 'TURN',
    name: 'Turn Undead',
    baseCost: 0.083,
    barterFactor: 0,
    description: "Decrease undead creature's Confidence (willingness to fight).",
    school: 'Conjuration',
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon'],
    unit: 'pts',
  },
  WABR: {
    id: 'WABR',
    name: 'Water Breathing',
    baseCost: 14.5,
    barterFactor: 400,
    school: 'Alteration',
    description: 'Lets the target breathe underwater.',
    availableParameters: ['Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    unit: 'pts',
    isFlatCostConstantEffect: true,
  },
  WAWA: {
    id: 'WAWA',
    name: 'Water Walking',
    school: 'Alteration',
    baseCost: 13.0,
    barterFactor: 400,
    description: 'Lets the target walk on water.',
    availableParameters: ['Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    unit: 'pts',
    isFlatCostConstantEffect: true,
  },
  WKDI: {
    id: 'WKDI',
    school: 'Destruction',
    name: 'Weakness to Disease',
    baseCost: 0.12,
    barterFactor: 0,
    constantEffectFactor: 0,
    description: "Decrease target's resistance to common disease.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    isCursedEnchantment: true,
    unit: 'pts',
  },
  WKFI: {
    id: 'WKFI',
    school: 'Destruction',
    name: 'Weakness to Fire',
    baseCost: 0.1,
    barterFactor: 0,
    constantEffectFactor: 0,
    description: "Decrease target's resistance to elemental fire.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    isCursedEnchantment: true,
    unit: 'pts',
  },
  WKFR: {
    id: 'WKFR',
    school: 'Destruction',
    name: 'Weakness to Frost',
    baseCost: 0.1,
    barterFactor: 0,
    constantEffectFactor: 0,
    description: "Decrease target's resistance to elemental frost.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    isCursedEnchantment: true,
    unit: 'pts',
  },
  WKMA: {
    id: 'WKMA',
    school: 'Destruction',
    name: 'Weakness to Magic',
    baseCost: 0.25,
    barterFactor: 0,
    constantEffectFactor: 0,
    description: "Decrease target's resistance to magic.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    isCursedEnchantment: true,
    unit: 'pts',
  },
  WKNW: {
    id: 'WKNW',
    school: 'Destruction',
    name: 'Weakness to Normal Weapons',
    baseCost: 0.25,
    barterFactor: 0,
    constantEffectFactor: 0,
    description: "Decrease target's resistance to normal weapons.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    isCursedEnchantment: true,
    unit: 'pts',
  },
  WKPO: {
    id: 'WKPO',
    school: 'Destruction',
    name: 'Weakness to Poison',
    baseCost: 0.1,
    barterFactor: 0,
    constantEffectFactor: 0,
    description: "Decrease target's resistance to poison.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    isCursedEnchantment: true,
    unit: 'pts',
  },
  WKSH: {
    id: 'WKSH',
    school: 'Destruction',
    name: 'Weakness to Shock',
    baseCost: 0.1,
    barterFactor: 0,
    constantEffectFactor: 0,
    description: "Decrease target's resistance to elemental shock.",
    availableParameters: ['Magnitude', 'Area', 'Duration'],
    availableEquipment: ['Weapon', 'Worn'],
    isCursedEnchantment: true,
    unit: 'pts',
  },
  Z001: {
    id: 'Z001',
    name: "Summon Rufio's Ghost",
    school: 'Conjuration',
    baseCost: 13.0,
    barterFactor: 0,
    description: "Summons Rufio's Ghost. (Used in a Dark Brotherhood quest.)",
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  Z002: {
    id: 'Z002',
    name: 'Summon Ancestor Guardian',
    school: 'Conjuration',
    baseCost: 33.3,
    barterFactor: 0,
    description: 'Summons Ancestor Guardian. (Dunmer racial ability)',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  Z003: {
    id: 'Z003',
    name: 'Summon Spiderling',
    school: 'Conjuration',
    baseCost: 45.0,
    barterFactor: 0,
    description: 'Summons Spiderling. (Used by Spider Daedra)',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  Z004: {
    id: 'Z004',
    name: 'Summon Flesh Atronach',
    school: 'Conjuration',
    baseCost: 1,
    barterFactor: 0,
    description: 'Summons Spiderling. (Used by Spider Daedra)',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  Z005: {
    id: 'Z005',
    name: 'Summon Bear',
    school: 'Conjuration',
    baseCost: 47.3,
    barterFactor: 0,
    description:
      'Summons Bear. (Used by Spriggans, available to the player with the Spell Tomes official plug-in.)',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  Z006: {
    id: 'Z006',
    name: 'Summon Gluttonous Hunger',
    school: 'Conjuration',
    baseCost: 61,
    barterFactor: 0,
    description: 'Summons Gluttonous Hunger.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  Z007: {
    id: 'Z007',
    name: 'Summon Ravenous Hunger',
    school: 'Conjuration',
    baseCost: 123.33,
    barterFactor: 0,
    description: 'Summons Ravenous Hunger.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  Z008: {
    id: 'Z008',
    name: 'Summon Voracious Hunger',
    school: 'Conjuration',
    baseCost: 175,
    barterFactor: 0,
    description: 'Summons Ravenous Hunger.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  Z009: {
    id: 'Z009',
    name: 'Summon Dark Seducer',
    school: 'Conjuration',
    baseCost: 1,
    barterFactor: 0,
    description: 'Summons Dark Seducer.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  Z010: {
    id: 'Z010',
    name: 'Summon Golden Saint',
    school: 'Conjuration',
    baseCost: 1,
    barterFactor: 0,
    description: 'Summons Golden Saint.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  Z012: {
    id: 'Z012',
    name: 'Summon Decrepit Shambles',
    school: 'Conjuration',
    baseCost: 45,
    barterFactor: 0,
    description: 'Summons Decrepit Shambles.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  Z013: {
    id: 'Z013',
    name: 'Summon Shambles',
    school: 'Conjuration',
    baseCost: 87.5,
    barterFactor: 0,
    description: 'Summons Shambles.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  Z014: {
    id: 'Z014',
    name: 'Summon Replete Shambles',
    school: 'Conjuration',
    baseCost: 150,
    barterFactor: 0,
    description: 'Summons Replete Shambles.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  Z015: {
    id: 'Z015',
    name: 'Summon Hunger',
    school: 'Conjuration',
    baseCost: 22,
    barterFactor: 0,
    description: 'Summons Hunger.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  ZCLA: {
    id: 'ZCLA',
    name: 'Summon Clannfear',
    school: 'Conjuration',
    baseCost: 75.56,
    barterFactor: 0,
    description: 'Summons Clannfear.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  ZDAE: {
    id: 'ZDAE',
    name: 'Summon Daedroth',
    school: 'Conjuration',
    baseCost: 123.33,
    barterFactor: 0,
    description: 'Summons Daedroth.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  ZDRE: {
    id: 'ZDRE',
    name: 'Summon Dremora',
    school: 'Conjuration',
    baseCost: 72.5,
    barterFactor: 0,
    description: 'Summons Dremora.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  ZDRL: {
    id: 'ZDRL',
    name: 'Summon Dremora Lord',
    school: 'Conjuration',
    baseCost: 157.14,
    barterFactor: 0,
    description: 'Summons Dremora Lord.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  ZFIA: {
    id: 'ZFIA',
    name: 'Summon Flame Atronach',
    school: 'Conjuration',
    baseCost: 45.0,
    barterFactor: 0,
    description: 'Summons Flame Atronach.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  ZFRA: {
    id: 'ZFRA',
    name: 'Summon Frost Atronach',
    school: 'Conjuration',
    baseCost: 102.86,
    barterFactor: 0,
    description: 'Summons Frost Atronach.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  ZGHO: {
    id: 'ZGHO',
    name: 'Summon Ghost',
    school: 'Conjuration',
    baseCost: 22.0,
    barterFactor: 0,
    description: 'Summons Ghost.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  ZHDZ: {
    id: 'ZHDZ',
    name: 'Summon Headless Zombie',
    school: 'Conjuration',
    baseCost: 56.0,
    barterFactor: 0,
    description: 'Summons Headless Zombie.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  ZSCA: {
    id: 'ZSCA',
    name: 'Summon Scamp',
    school: 'Conjuration',
    baseCost: 30.0,
    barterFactor: 0,
    description: 'Summons Scamp.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  ZSKA: {
    id: 'ZSKA',
    name: 'Summon Skeleton Guardian',
    school: 'Conjuration',
    baseCost: 32.5,
    barterFactor: 0,
    description: 'Summons Skeleton Guardian.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  ZSKC: {
    id: 'ZSKC',
    name: 'Summon Skeleton Champion',
    school: 'Conjuration',
    baseCost: 152.0,
    barterFactor: 0,
    description: 'Summons Skeleton Champion.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  ZSKE: {
    id: 'ZSKE',
    name: 'Summon Skeleton',
    school: 'Conjuration',
    baseCost: 11.25,
    barterFactor: 0,
    description: 'Summons Skeleton.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  ZSKH: {
    id: 'ZSKH',
    name: 'Summon Skeleton Hero',
    school: 'Conjuration',
    baseCost: 66.0,
    barterFactor: 0,
    description: 'Summons Skeleton Hero.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  ZSPD: {
    id: 'ZSPD',
    name: 'Summon Spider Daedra',
    school: 'Conjuration',
    baseCost: 195.0,
    barterFactor: 0,
    description: 'Summons Spider Daedra.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  ZSTA: {
    id: 'ZSTA',
    name: 'Summon Storm Atronach',
    baseCost: 125.0,
    barterFactor: 0,
    description: 'Summons Storm Atronach.',
    school: 'Conjuration',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  ZWRA: {
    id: 'ZWRA',
    name: 'Summon Faded Wraith',
    school: 'Conjuration',
    baseCost: 87.5,
    barterFactor: 0,
    description: 'Summons Faded Wraith.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  ZWRL: {
    id: 'ZWRL',
    name: 'Summon Gloom Wraith',
    school: 'Conjuration',
    baseCost: 260.0,
    barterFactor: 0,
    description: 'Summons Gloom Wraith.',
    availableParameters: ['Duration'],
    availableEquipment: [],
    unit: 'pts',
  },
  ZXIV: {
    id: 'ZXIV',
    name: 'Summon Xivilai',
    school: 'Conjuration',
    baseCost: 200.0,
    barterFactor: 0,
    description: 'Summons Xivilai.',
    availableParameters: ['Duration'],
    availableEquipment: [],
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

// https://en.uesp.net/wiki/Oblivion:Spell_Making#Spell_Cost
export function getMagickaCost({
  baseCost,
  magnitude,
  duration,
  area,
}: {
  baseCost: number;
  magnitude: number;
  duration: number;
  area: number;
}): number {
  const B = baseCost / 10;
  const M = Math.max(magnitude ** 1.28, 1);
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
