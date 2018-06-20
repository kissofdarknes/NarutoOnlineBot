const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const cnninjas = require("./cn_sim_response.json"); // Swap with en_sim_response.json to use english NO1.0 data
//const cnninjas = require("./de_sim_response.json"); // Swap with en_sim_response.json to use english NO1.0 data

client.login(config.token);

client.on("ready", () => {
  console.log("I am ready!");
  client.user.setGame("!help for cmd list.");
});

client.on("message", (message) => {
  // check if message is a command
  const isInvalidPrefix = !message.content.startsWith(config.prefix)
    && !RegExp(`^<@!?${message.client.user.id}>`).test(message.content);
  if (message.author.bot || isInvalidPrefix) {
    return;
  }

  // Help Command
  if (message.content.startsWith(config.prefix + "help")) {
    message.channel.send("Commands available: \n!ninja <name> | !image <name> | !list1 | !list2 | !stats <name> | !filter <tag> | !suggestedteam <name>")
  }

  if (message.content.startsWith(config.prefix + "ninja")) {
    try {
      let args = message.content.split(" ").slice(1);
      let ninjaName = args[0];
      ninObj = findNinja(ninjaName)

      if (ninjaName.toLowerCase() == 'zaze')
      {
        message.channel.send("#Zazed AYYYYYYYEEEEEEEEEEEEEEEEEEEEEEEE")
        return;
      }

      if (typeof ninObj == 'undefined')
      {
        message.channel.send("Sorry, I do not have information on " + ninjaName + ".\nPlease use !list1 or !list2 for a list of supported ninjas.")
        return;
      }

      mysteryObj = findSkill(ninObj.iOySkill, ninObj.iNid)
      standardObj = findSkill(ninObj.iPgSkill, ninObj.iNid)
      skill1Obj = findSkill(ninObj.iBdSkill1, ninObj.iNid)
      skill2Obj = findSkill(ninObj.iBdSkill2, ninObj.iNid)
      skill3Obj = findSkill(ninObj.iBdSkill3, ninObj.iNid)

      let isPrompt = "";
      if (mysteryObj.iMoment) {
        isPrompt = "[Prompt]";
      }
      let mysteryTitle = mysteryObj.szTitle + "[" + mysteryObj.szHurtType + mysteryObj.szHurtType2 + "]" + isPrompt;
      let mysteryDesc = "CD - " + mysteryObj.iChillTime + " BCD - " + mysteryObj.iChill + " Chakra: " + mysteryObj.iChakraUse + "\n" + mysteryObj.szDesc;

      if (skill3Obj == "_blank") {
        const embed = new Discord.RichEmbed()
          .setTitle("**__" + ninObj.szName + "__**")
          .setDescription("[" + ninObj.szAttr + "] " + ninObj.szOrg + "\nStat Growth: \n[Life|Atk|Def|Nin|Res]\n" + ninObj.szBasicAttr)
          .setColor(3447003)
          .setThumbnail("https://github.com/AisuRyuuko/NarutoOnlineBot/blob/master/Images/" + ninObj.iNid + ".png?raw=true")
          .addField(mysteryTitle, mysteryDesc)
          .addField(standardObj.szTitle + "[" + standardObj.szHurtType + standardObj.szHurtType2 + "]",standardObj.szDesc)
          .addField(skill1Obj.szTitle + "[" + skill1Obj.szHurtType + skill1Obj.szHurtType2 + "]",skill1Obj.szDesc)
          .addField(skill2Obj.szTitle + "[" + skill2Obj.szHurtType + skill2Obj.szHurtType2 + "]",skill2Obj.szDesc)
          //.setFooter("Skills are based off CN v4.0 Ninjas. Original data pulled from http://bang.qq.com/tool/huoying/mnq.htm.")
          .setFooter("Skills are based off data pulled from http://test.naruto.rednubes.de/lang/2")
          message.channel.send({embed});
      }else {
        const embed = new Discord.RichEmbed()
          .setTitle("**__" + ninObj.szName + "__**")
          .setDescription("[" + ninObj.szAttr + "] " + ninObj.szOrg + "\nStat Growth: \n[Life|Atk|Def|Nin|Res]\n" + ninObj.szBasicAttr)
          .setColor(3447003)
          .setThumbnail("https://github.com/AisuRyuuko/NarutoOnlineBot/blob/master/Images/" + ninObj.iNid + ".png?raw=true")
          .addField(mysteryTitle, mysteryDesc)
          .addField(standardObj.szTitle + "[" + standardObj.szHurtType + standardObj.szHurtType2 + "]",standardObj.szDesc)
          .addField(skill1Obj.szTitle + "[" + skill1Obj.szHurtType + skill1Obj.szHurtType2 + "]",skill1Obj.szDesc)
          .addField(skill2Obj.szTitle + "[" + skill2Obj.szHurtType + skill2Obj.szHurtType2 + "]",skill2Obj.szDesc)
          .addField(skill3Obj.szTitle + "[" + skill3Obj.szHurtType + skill3Obj.szHurtType2 + "]",skill3Obj.szDesc)
          //.setFooter("Skills are based off CN v4.0 Ninjas. Original data pulled from http://bang.qq.com/tool/huoying/mnq.htm.")
          .setFooter("Skills are based off data pulled from http://test.naruto.rednubes.de/lang/2")
          message.channel.send({embed});
      }

    } catch (e) {
      console.log(e)
    }
  }

  if (message.content.startsWith(config.prefix + "image")) {
    try {
      let args = message.content.split(" ").slice(1);
      let ninjaName = args[0];
      ninObj = findNinja(ninjaName)

      if (typeof ninObj == 'undefined')
      {
        message.channel.send("Sorry, I do not have information on " + ninjaName + ".\nThis command currently only supports EN ninjas.\nPlease use !list1 or !list2 for a list of supported ninjas.")
        return;
      }

      message.channel.send({
          "embed": {
            title: ninObj.szName,
            description: "Stat Growth: \n[Life|Atk|Def|Nin|Res]\n" + ninObj.szBasicAttr,
            "image": {
              "url": "https://github.com/kissofdarknes/NarutoOnlineBot/tree/master/Images" + ninObj.iNid + "_image.png?raw=true",
            }
          }
        });
    } catch (e) {
      console.log(e)
    }
  }
  
  if (message.content.startsWith(config.prefix + "suggestedteams")) {
    try {
      let args = message.content.split(" ").slice(1);
      let ninjaName = args[0];
      ninObj = findNinja(ninjaName)

      if (typeof ninObj == 'undefined')
      {
        message.channel.send("Sorry, I do not have information on " + ninjaName + ".\nThis command currently only supports EN ninjas.\nPlease use !list1 or !list2 for a list of supported ninjas.")
        return;
      }

      message.channel.send({
          "embed": {
            title: ninObj.szName,
            description: "Stat Growth: \n[Life|Atk|Def|Nin|Res]\n" + ninObj.szBasicAttr,
            "image": {
              "url": "https://github.com/kissofdarknes/NarutoOnlineBot/tree/master/Images" + ninObj.iNid + "_image.png?raw=true",
            }
          }
        });
    } catch (e) {
      console.log(e)
    }
  }

  if (message.content.startsWith(config.prefix + "stats")) {
    try {
      let args = message.content.split(" ").slice(1);
      let ninjaName = args[0];

      ninObj = findNinja(ninjaName)

      if (typeof ninObj == 'undefined')
      {
        message.channel.send("Sorry, I do not have information on " + ninjaName + ".\nPlease use !list1 or !list2 for a list of supported ninjas.")
        return;
      }

      const embed = new Discord.RichEmbed()
        .setTitle("**__" + ninObj.szName + "__**")
        .setDescription("[" + ninObj.szAttr + "] " + ninObj.szOrg + "\nStat Growth: \n[Life|Atk|Def|Nin|Res]\n" + ninObj.szBasicAttr)
        .setColor(3447003)
        message.channel.send({embed});
    } catch (e) {
      console.log(e)
    }
  }

  // List Ninjas Command
  if (message.content.startsWith(config.prefix + "list1")) {
    var cnninjaArray = [];
    // Get all ninjas in array
    for (var key in cnninjas.data.ninjas) {
      if (cnninjas.data.ninjas.hasOwnProperty(key)) {
        cnninjaArray.push(cnninjas.data.ninjas[key].szNickname);
      }
    }
    /// Show 1st half of ninjas.
    cnninjaArray.sort();
    var cnninjaList = "";
    for (var i = 0; i < Math.floor(cnninjaArray.length/2); i++) {
      cnninjaList += "[" + cnninjaArray[i] + "] "
    }
    //console.log(cnninjaArray.length)
    message.channel.send("List of CN ninjas: " + cnninjaList)
  }

  if (message.content.startsWith(config.prefix + "list2")) {
    var cnninjaArray = [];
    // Get all ninjas in array
    for (var key in cnninjas.data.ninjas) {
      if (cnninjas.data.ninjas.hasOwnProperty(key)) {
        cnninjaArray.push(cnninjas.data.ninjas[key].szNickname);
      }
    }
    /// Show 2nd half of ninjas.
    cnninjaArray.sort();
    var cnninjaList = "";
    for (var i = Math.floor(cnninjaArray.length/2); i < cnninjaArray.length; i++) {
      cnninjaList += "[" + cnninjaArray[i] + "] "
    }
    //console.log(cnninjaArray.length)
    message.channel.send("List of CN ninjas: " + cnninjaList)
  }

  if (message.content.startsWith(config.prefix + "filter")) {
    try {
      let args = message.content.split(" ").slice(1);
      var filterTag = ""
      for (var i = 0; i < args.length; i++) {
        filterTag += args[i]
      }

      var tagArray = [];
      // Get all tags in array
      for (var key in cnninjas.data.ninjas) {
        if (cnninjas.data.ninjas.hasOwnProperty(key)) {
          tagArray.push(cnninjas.data.ninjas[key].szOrg);
        }
      }

      var resultTag = [];
      for (var i = 0; i < tagArray.length; i++) {
        resultTag = resultTag.concat(tagArray[i].split(","));
      }

      tagArray = resultTag.filter(function (el, i, arr) { return arr.indexOf(el) ===i;});
      tagArray.sort();

      let tagList = ""
      for (var i = 0; i < tagArray.length; i++) {
        if (!tagArray[i] == "") {
          tagList += "[" + tagArray[i].trim() +  "] "
        }
      }

      let tagFound = "false"
      for (var i = 0; i < tagArray.length; i++) {
        if (tagArray[i].toLowerCase().replace(" ", "") == filterTag.toLowerCase().replace(" ", "")) {
          tagFound = "true"
        }
      }
      if (tagFound == "false") {
        message.channel.send("Sorry, that is not a valid option. Please try one of the following: " + tagList)
        return;
      }

      var ninjaArray = [];
      // Find all ninjas with tag; add to array
      for (var key in cnninjas.data.ninjas) {
        if (cnninjas.data.ninjas.hasOwnProperty(key)) {
          var tags = cnninjas.data.ninjas[key].szOrg.split(",")
          for (var i = 0; i < tags.length; i++) {
            if (tags[i].toLowerCase().replace(" ", "") == filterTag.toLowerCase()) {
              ninjaArray.push(cnninjas.data.ninjas[key].szNickname);
            }
          }
        }
      }
      /// Show ninjas with tag.
      ninjaArray.sort();
      var ninjaList = "";
      for (var i = 0; i < ninjaArray.length; i++) {
        ninjaList += "[" + ninjaArray[i] + "] "
      }
      message.channel.send("List of ninjas with " + filterTag + ": " + ninjaList)
    } catch (e) {
      console.log(e)
    }
  }


});

function findNinja(name) {
  var data = cnninjas.data.ninjas;
  for (var i = 0; i < data.length; i++) {
    if (data[i].szNickname.toLowerCase() == name.toLowerCase()) {
      return data[i];
    }
  }
}

function findSkill(skillID, ninID) {
  var data = cnninjas.data.skills;
  for (var i = 0; i < data.length; i++) {
    if (skillID.toLowerCase() == '0') {
      return "_blank";
    }else if (data[i].iSkillId.toLowerCase() == skillID.toLowerCase() && data[i].iNid == ninID) {
      return data[i];
    }
  }
}
