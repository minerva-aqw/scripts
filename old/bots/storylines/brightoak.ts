/// name: Bright Oak
/// desc: Brightoak extra storyline, quests 4463-4810. Completed quests return true without touching anything, so re-runs resume where they left off.

// Ported from Skua Story/QueenofMonsters/Extra/BrightOak.doall.
// Handler keys are requirement ItemIDs (stable); map-item IDs and
// monster names come from the same source, quantities from quest-data.
// Skua's spirit-animal packets (getMapItem 3935 / equipItem 32057) and
// EquipClass calls have no bot equivalent and are skipped.
// LegacyQuestManager token chains are sequential quests + pickups.
// CheckDailyv2 has no bot equivalent: dailies run unconditionally,
// completed ones no-op on re-runs.

function naturePotion(quant) {
  let rounds = 0;
  while (!bot.ensureItem("Restoration of Nature Potion", quant)) {
    if (rounds >= 6) {
      throw new Error("no Restoration of Nature Potion after 6 refills of 4660");
    }
    bot.quest(4660, {
      "32200": function () { bot.hunt("Bright Treeant", "brightoak", 3, "r2", "Left"); }, // Bright Ore
      "6649": function () { bot.travel("sandsea"); bot.buyItem(245, 6649); }, // Water of Life
      "32201": function () { bot.hunt("Wolfwood", "brightoak", 4, "r2", "Left"); }, // Herbal Remedy
    });
    bot.pickup("Restoration of Nature Potion");
    rounds += 1;
  }
}

bot.pickup("Restoration of Nature Potion");
bot.pickup("Paddylump's Elixir");

// AElfred (Rivensylth)
bot.quest(4637, {
  "32045": function () { bot.gather(3944, "rivensylth"); }, // Forest Floor Surveyed
});

bot.quest(4638, {
  "32046": function () { bot.hunt("Cave Creeper", "rivensylth", 9); }, // Cave Creeper Earlobe
});

bot.quest(4639, {
  "32047": function () { bot.gather(3945, "rivensylth", 4); }, // Tree Trap Placed
});

bot.quest(4640, {
  "32048": function () { bot.hunt("Mushroom", "rivensylth", 8); }, // Defensive Mechanics Utilized
});

bot.quest(4641, {
  "32049": function () { bot.gather(3948, "rivensylth", 4); }, // Tree Sap
  "32050": function () { bot.hunt("Pine Grizzly", "pines", 3); }, // Straw
});

bot.quest(4642, {
  "32051": function () { bot.hunt("Cave Creeper", "rivensylth", 10); }, // Forest Enemy Defeated
});

bot.quest(4643, {
  "32052": function () { bot.gather(3946, "rivensylth"); }, // Rivensylth Located
});

bot.quest(4644, {
  "32053": function () { bot.hunt("Avada", "rivensylth"); }, // Avada Defeated
});

// Aven Greywhorl (Elfhame)
bot.quest(4466, {
  "30814": function () { bot.hunt("Bright Treeant", "brightoak", 10); }, // Thorned Rose
});

bot.quest(4659, {
  "32198": function () { bot.gather(3983, "elfhame"); }, // Elfhame Inspected
  "32199": function () { bot.hunt("Ruin Stalker", "elfhame", 6); }, // Ruin Stalker Defeated
});

naturePotion(1);

bot.quest(4661, {
  "32203": function () { bot.hunt("Blighted Deer", "elfhame", 5); }, // Blighted Deer Cleared
});

if (!bot.ensureItem("Paddylump's Elixir")) {
  bot.quest(820, {
    "5669": function () { bot.hunt("Acornent", "cloister", 15); }, // Wiggly Worm
    "5670": function () { bot.hunt("Karasu", "cloister", 10); }, // MegaMite
  });
  bot.pickup("Paddylump's Elixir");
}

bot.quest(4662, {
  "32205": function () { bot.hunt("Ruin Dweller", "elfhame", 12); }, // Ruin Dweller Defeated
});

naturePotion(2);

bot.quest(4663, {
  "32206": function () { bot.hunt("Wolfrider", "elfhame", 4); }, // Wolfrider Maimed
});

bot.quest(4664, {
  "32207": function () { bot.hunt("Ratawampus", "elfhame", 12); }, // Ratawampus Defeated
});

naturePotion(3);

bot.quest(4665, {
  "32208": function () { bot.hunt("Ratawampus", "elfhame", 2); }, // Ratawampus Cleared
  "32209": function () { bot.hunt("Ruin Dweller", "elfhame", 3); }, // Ruin Dweller Cleared
});

naturePotion(4);

bot.quest(4666, {
  "32210": function () { bot.hunt("Ruin Stalker", "elfhame", 6, "r2", "Left"); }, // Ruin Stalker Contained
});

bot.quest(4667, {
  "32211": function () { bot.gather(3984, "elfhame"); }, // Puzzle Completed
});

bot.quest(4668, {
  "32212": function () { bot.hunt("Guardian Spirit", "elfhame"); }, // Guardian Defeated
});

// Flix Spiderwhisp
bot.quest(4469, {
  "30818": function () { bot.hunt("Hootbear", "brightoak", 8); }, // Corralled Hootbear
});

bot.quest(4470, {
  "30820": function () { bot.gather(3667, "brightoak", 5); }, // Solution Poured
  "30819": function () { bot.hunt("Brightpool Guardian", "brightoak", 9); }, // Brightpool Subdued
});

// Lapis part 1 (Blossom comes off the same 3666 pickups)
bot.quest(4467, {
  "30816": function () { bot.gather(3666, "brightoak", 10); }, // Blossom
  "30815": function () { bot.hunt("Grove Spore", "brightoak", 10); }, // Herbal Spore
});

bot.quest(4468, {
  "30817": function () { bot.hunt("Twisted Goblin", "brightoak", 8); }, // Goblin Guts
});

// Ravinos Brightglade part 1
bot.quest(4463, {
  "30809": function () { bot.hunt("Wolfwood", "brightoak", 2, "r2", "Left"); }, // Corrupted Fang
  "30810": function () { bot.hunt("Hootbear", "brightoak", 4, "r3", "Left"); }, // Shriveled Claw
  "30811": function () { bot.hunt("Tainted Earth", "brightoak", 2, "r6", "Left"); }, // Muddy Vial
});

bot.quest(4692, {
  "32736": function () { bot.gather(4052, "darkheart"); }, // Brightoak Tree Surveyed
});

bot.quest(4693, {
  "32737": function () { bot.hunt("Mutated Leech", "darkheart", 9); }, // Mutated Leech Slain
});

bot.quest(4694, {
  "32738": function () { bot.hunt("Mutated Leech", "darkheart", 9); }, // Supplies Gathered
});

bot.quest(4695, {
  "32740": function () { bot.hunt("Wisterrora", "darkheart", 5); }, // Wisterrora Defeated
  "32739": function () { bot.gather(4053, "darkheart", 6); }, // Purification Orb
});

bot.quest(4696, {
  "32741": function () { bot.gather(4054, "darkheart", 6); }, // Spider Web Broken
  "32742": function () { bot.hunt("Toxic Grove Spider", "darkheart", 7); }, // Toxic Grove Spider Defeated
});

bot.quest(4697, {
  "32751": function () { bot.gather(4055, "darkheart", 7); }, // Brightpool Core Placed
  "32743": function () { bot.hunt("Brightpool Guardian", "brightoak", 7); }, // Brightpool Core Retrieved
});

bot.quest(4698, {
  "32744": function () { bot.hunt("Tainted Earth", "darkheart", 8, "Enter", "Spawn"); }, // Tainted Earth Removed
  "32745": function () { bot.hunt("Toxic Grove Spider", "darkheart", 5, "r2", "Left"); }, // Toxic Grove Spider Dispatched
  "32752": function () { bot.hunt("Mutated Leech", "darkheart", 6, "Enter", "Spawn"); }, // Mutated Leech Slain
});

bot.quest(4699, {
  "32746": function () { bot.gather(4056, "darkheart"); }, // Portal Found
});

bot.quest(4700, {
  "32747": function () { bot.hunt("Gaiazor", "darkheart"); }, // Gaiazor Defeated
});

// Ravinos Brightglade part 2 (token chain 4799-4803, then talk to Lapis)
bot.quest(4799, {
  "33466": function () { bot.gather(4204, "gaiazor", 6); }, // Refugee Rescued
});
bot.pickup("Ravinos Token I");

bot.quest(4800, {
  "33467": function () { bot.hunt("Wolfwood", "gaiazor", 4); }, // Wolfwood Slain
  "33468": function () { bot.hunt("Wisterrora", "gaiazor", 4); }, // Wisterrora Slain
  "33469": function () { bot.hunt("Tree Golem", "gaiazor", 4); }, // Tree Golem Slain
});
bot.pickup("Ravinos Token II");

bot.quest(4801, {
  "33470": function () { bot.hunt("Tree Golem", "gaiazor"); }, // Lapis' Runestones
  "33471": function () { bot.hunt("Wolfwood", "gaiazor"); }, // Flix's Fertilizer
  "33472": function () { bot.hunt("Wisterrora", "gaiazor"); }, // Zephyr's Toolkit
});
bot.pickup("Ravinos Token III");

bot.quest(4802, {
  "33473": function () { bot.hunt("Tree Golem", "gaiazor", 5); }, // Tree Golem Roots
  "33474": function () { bot.hunt("Wisterrora", "gaiazor", 5); }, // Wisterrora Thorns
  "33475": function () { bot.gather(4205, "gaiazor", 5); }, // Barrier Erected
});
bot.pickup("Ravinos Token IV");

bot.quest(4803, {
  "33476": function () { bot.hunt("Toxic Grove Spider", "darkheart", 6); }, // Grove Spider Silk
  "33477": function () { bot.hunt("Trollola Plant", "bloodtusk", 5); }, // Trollola Nectar
  "33478": function () { bot.hunt("Sulfur Imp", "firestorm", 2); }, // Searbush
});
bot.pickup("Ravinos Token V");

bot.quest(4804, {
  "33479": function () { bot.gather(4206, "gaiazor"); }, // Talk to Lapis Willowmist
});

// Lapis part 2 (token chain 4805-4807, then return to Ravinos)
bot.quest(4805, {
  "33486": function () { bot.hunt("Wolfwood", "gaiazor", 7); }, // Wolfwood Twigs
  "33487": function () { bot.hunt("Wisterrora", "gaiazor"); }, // Drop of Wisterrora Ichor
});
bot.pickup("Lapis Token I");

if (!bot.ensureItem("Sparrow's Blood")) {
  bot.quest(803, {
    "5592": function () { bot.hunt("*", "arcangrove", 12, "Back", "Left"); }, // DOOM Dirt
    "5593": function () { bot.hunt("*", "arcangrove", 17, "RightBack", "Left"); }, // Snapdrake
    "5594": function () { bot.hunt("*", "arcangrove", 30, "LeftBack", "Left"); }, // Blood Lily
  });
  bot.pickup("Sparrow's Blood");
}

bot.quest(4806, {});
bot.pickup("Lapis Token II");

bot.quest(4807, {
  "33490": function () { bot.gather(4207, "gaiazor"); bot.gather(4208, "gaiazor"); bot.gather(4209, "gaiazor"); }, // Light the Incense
  "33491": function () { bot.gather(4207, "gaiazor"); bot.gather(4208, "gaiazor"); bot.gather(4209, "gaiazor"); }, // Read the Scroll
  "33492": function () { bot.gather(4207, "gaiazor"); bot.gather(4208, "gaiazor"); bot.gather(4209, "gaiazor"); }, // Use the Potion
});
bot.pickup("Lapis Token III");

bot.quest(4808, {
  "33493": function () { bot.gather(4210, "gaiazor"); }, // Talk to Ravinos Brightglade
});

// Ravinos Brightglade part 3
bot.quest(4809, {
  "33494": function () { bot.hunt("Nevanna", "gaiazor"); }, // Nevanna Defeated
});

bot.quest(4810, {
  "33495": function () { bot.hunt("Gaiazor", "gaiazor"); }, // Gaiazor Defeated
});

// Extra dailies (rep)
bot.quest(4471, {
  "30821": function () { bot.hunt("Bright Treeant", "brightoak", 5); }, // Treeant Trunk
  "30822": function () { bot.hunt("Wolfwood", "brightoak", 7, "r8", "Spawn"); }, // Wolfwood Fur
});

bot.quest(4472, {
  "30823": function () { bot.hunt("Brightpool Guardian", "brightoak", 7); }, // Disciplined Guardian
});
