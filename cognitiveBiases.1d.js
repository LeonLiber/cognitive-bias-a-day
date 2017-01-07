#!/usr/bin/env /usr/local/bin/node

/*
# <bitbar.title>Cognitive Bias A Day</bitbar.title>
# <bitbar.version>v1.0</bitbar.version>
# <bitbar.author>Arik Liber</bitbar.author>
# <bitbar.author.github>https://github.com/LeonLiber/cognitive-bias-a-day</bitbar.author.github>
# <bitbar.desc>A BitBar ❤️ plugin showing you a fresh cognitive bias every day 🙊</bitbar.desc>
# <bitbar.image>https://raw.githubusercontent.com/LeonLiber/cognitive-bias-a-day/master/screenshot.png</bitbar.image>
# <bitbar.dependencies>npm install bitbar wikipedia-js striptags</bitbar.dependencies>
# <bitbar.abouturl>https://github.com/LeonLiber/cognitive-bias-a-day</bitbar.abouturl>
*/

const bitbar = require('bitbar');
const wikipedia = require('wikipedia-js');
const striptags = require('striptags');
const fs = require('fs')

//Data. Source: https://github.com/busterbenson/public/blob/master/cognitive-bias-cheat-sheet.json
const data = {
 "name": "biases",
 "children": [

  {
   "name": "1. Too Much Information",
   "children": [

    {
    "name": "We notice things already primed in memory or repeated often.",
     "children": [
      {"name": "Availability heuristic"},
      {"name": "Attentional bias"},
      {"name": "Illusory truth effect"},
      {"name": "Mere exposure effect"},
      {"name": "Context effect"},
      {"name": "Cue-dependent forgetting"},
      {"name": "Mood-congruent memory bias"},
      {"name": "Frequency illusion"},
      {"name": "Baader-Meinhof Phenomenon"},
      {"name": "Empathy gap"},
      {"name": "Omission bias"},
      {"name": "Base rate fallacy"}
     ]
    },

    {
      "name": "Bizarre/funny/visually-striking/anthropomorphic things stick out more than non-bizarre/unfunny things.",
      "children": [
        {"name": "Bizarreness effect"},
        {"name": "Humor effect"},
        {"name": "Von Restorff effect"},
        {"name": "Picture superiority effect"},
        {"name": "Self-relevance effect"},
        {"name": "Negativity bias"}
      ]
    },

    {
      "name": "We notice when something has changed.",
      "children": [

        {"name": "Anchoring"},
        {"name": "Conservatism"},
        {"name": "Contrast effect"},
        {"name": "Distinction bias"},
        {"name": "Focusing effect"},
        {"name": "Framing effect"},
        {"name": "Money illusion"},
        {"name": "Weber–Fechner law"}

      ]
    },

    {
      "name": "We are drawn to details that confirm our own existing beliefs",
      "children": [

        {"name": "Confirmation bias"},
        {"name": "Congruence bias"},
        {"name": "Post-purchase rationalization"},
        {"name": "Choice-supportive bias"},
        {"name": "Selective perception"},
        {"name": "Observer-expectancy effect"},
        {"name": "Experimenter's bias"},
        {"name": "Observer effect"},
        {"name": "Expectation bias"},
        {"name": "Ostrich effect"},
        {"name": "Subjective validation"},
        {"name": "Continued influence effect"},
        {"name": "Semmelweis reflex"}

      ]
    },

    {
      "name": "We notice flaws in others more easily than flaws in ourselves.",
      "children": [

        {"name": "Bias blind spot"},
        {"name": "Naïve cynicism"},
        {"name": "Naïve realism"}

      ]
    }

  ]
},

  {
   "name": "2. Not Enough Meaning",
   "children": [
    {
    "name": "We find stories and patterns even in sparse data",
     "children": [

      {"name": "Confabulation"},
      {"name": "Clustering illusion"},
      {"name": "Insensitivity to sample size"},
      {"name": "Neglect of probability"},
      {"name": "Anecdotal fallacy"},
      {"name": "Illusion of validity"},
      {"name": "Masked man fallacy"},
      {"name": "Recency illusion"},
      {"name": "Gambler's fallacy"},
      {"name": "Hot-hand fallacy"},
      {"name": "Illusory correlation"},
      {"name": "Pareidolia"},
      {"name": "Anthropomorphism"}

     ]
    },

    {
    "name": "We fill in characteristics from stereotypes, generalities, and prior histories",
     "children": [

      {"name": "Group attribution error"},
      {"name": "Ultimate attribution error"},
      {"name": "Stereotyping"},
      {"name": "Essentialism"},
      {"name": "Functional fixedness"},
      {"name": "Moral credential effect"},
      {"name": "Just-world hypothesis"},
      {"name": "Argument from fallacy"},
      {"name": "Authority bias"},
      {"name": "Automation bias"},
      {"name": "Bandwagon effect"},
      {"name": "Placebo effect"}
     ]
    },

    {
    "name": "We imagine things and people we're familiar with or fond of as better",
     "children": [

       {"name": "Out-group homogeneity bias"},
       {"name": "Cross-race effect"},
       {"name": "In-group bias"},
       {"name": "Halo effect"},
       {"name": "Cheerleader effect"},
       {"name": "Positivity effect"},
       {"name": "Not invented here"},
       {"name": "Reactive devaluation"},
       {"name": "Well-traveled road effect"}

     ]
    },

    {
    "name": "We simplify probabilities and numbers to make them easier to think about",
     "children": [

{"name": "Mental accounting"},
{"name": "Appeal to probability fallacy"},
{"name": "Normalcy bias"},
{"name": "Murphy's Law"},
{"name": "Zero sum bias"},
{"name": "Survivorship bias"},
{"name": "Subadditivity effect"},
{"name": "Denomination effect"},
{"name": "Magic number 7+-2"}

     ]
    },

    {
    "name":"We think we know what other people are thinking",
     "children": [

      {"name": "Illusion of transparency"},
      {"name": "Curse of knowledge"},
      {"name": "Spotlight effect"},
      {"name": "Extrinsic incentive error"},
      {"name": "Illusion of external agency"},
      {"name": "Illusion of asymmetric insight"}

     ]
    },

    {
    "name": "We project our current mindset and assumptions onto the past and future",
     "children": [

      {"name": "Telescoping effect"},
      {"name": "Rosy retrospection"},
      {"name": "Hindsight bias"},
      {"name": "Outcome bias"},
      {"name": "Moral luck"},
      {"name": "Declinism"},
      {"name": "Impact bias"},
      {"name": "Pessimism bias"},
      {"name": "Planning fallacy"},
      {"name": "Time-saving bias"},
      {"name": "Pro-innovation bias"},
      {"name": "Projection bias"},
      {"name": "Restraint bias"},
      {"name": "Self-consistency bias"}

     ]
    }

   ]
  },

  {
   "name": "3. Need To Act Fast",
   "children": [

    {
     "name": "To act, we must be confident we can make an impact and feel what we do is important",
     "children": [

      {"name": "Overconfidence effect"},
      {"name": "Social desirability bias"},
      {"name": "Third-person effect"},
      {"name": "False consensus effect"},
      {"name": "Hard-easy effect"},
      {"name": "Lake Wobegone effect"},
      {"name": "Dunning-Kruger effect"},
      {"name": "Egocentric bias"},
      {"name": "Optimism bias"},
      {"name": "Forer effect"},
      {"name": "Barnum effect"},
      {"name": "Self-serving bias"},
      {"name": "Actor-observer bias"},
      {"name": "Illusion of control"},
      {"name": "Illusory superiority"},
      {"name": "Fundamental attribution error"},
      {"name": "Defensive attribution hypothesis"},
      {"name": "Trait ascription bias"},
      {"name": "Effort justification"},
      {"name": "Risk compensation"},
      {"name": "Peltzman effect"}

     ]
    },

    {
     "name": "To stay focused, we favor the immediate, relatable thing in front of us",
     "children": [

        {"name": "Hyperbolic discounting"},
        {"name": "Appeal to novelty"},
        {"name": "Identifiable victim effect"}

     ]
    },

    {
     "name": "To get anything done, we tend to complete things we've invested time & energy in.",
     "children": [

        {"name": "Sunk cost fallacy"},
        {"name": "Irrational escalation"},
        {"name": "Escalation of commitment"},
        {"name": "Generation effect"},
        {"name": "Loss aversion"},
        {"name": "IKEA effect"},
        {"name": "Unit bias"},
        {"name": "Zero-risk bias"},
        {"name": "Disposition effect"},
        {"name": "Pseudocertainty effect"},
        {"name": "Processing difficulty effect"},
        {"name": "Endowment effect"},
        {"name": "Backfire effect"}

     ]
    },

    {
     "name": "To avoid mistakes, we tend to preserve our autonomy and group status, and avoid irreversible decisions.",
     "children": [

      {"name": "System justification"},
      {"name": "Reverse psychology"},
      {"name": "Reactance"},
      {"name": "Decoy effect"},
      {"name": "Social comparison bias"},
      {"name": "Status quo bias"}

     ]
    },

    {
     "name": "We favor options that appear simple or have more complete information over more complex, ambiguous options.",
     "children": [

      {"name": "Ambiguity bias"},
      {"name": "Information bias"},
      {"name": "Belief bias"},
      {"name": "Rhyme as reason effect"},
      {"name": "Bike-shedding effect"},
      {"name": "Law of Triviality"},
      {"name": "Delmore effect"},
      {"name": "Conjunction fallacy"},
      {"name": "Occam's razor"},
      {"name": "Less-is-better effect"}

     ]
    }

   ]
  },


  {
   "name": "4. What Should We Remember?",
   "children": [

    {
     "name": "We edit and reinforce some memories after the fact",
     "children": [

        {"name": "Misattribution of memory"},
        {"name": "Source confusion"},
        {"name": "Cryptomnesia"},
        {"name": "False memory"},
        {"name": "Suggestibility"},
        {"name": "Spacing effect"}

     ]
    },

    {
     "name": "We discard specifics to form generalities",
     "children": [

        {"name": "Implicit associations"},
        {"name": "Implicit stereotypes"},
        {"name": "Stereotypical bias"},
        {"name": "Prejudice"},
        {"name": "Negativity bias"},
        {"name": "Fading affect bias"}

     ]
    },

    {
     "name": "We reduce events and lists to their key elements",
     "children": [

        {"name": "Peak–end rule"},
        {"name": "Leveling and sharpening"},
        {"name": "Misinformation effect"},
        {"name": "Serial recall effect"},
        {"name": "List-length effect"},
        {"name": "Duration neglect"},
        {"name": "Modality effect"},
        {"name": "Memory inhibition"},
        {"name": "Primacy effect"},
        {"name": "Recency effect"},
        {"name": "Part-list cueing effect"},
        {"name": "Serial position effect"},
        {"name": "Suffix effect"}

     ]
    },

    {
     "name": "We store memories differently based on how they were experienced",
     "children": [

      {"name": "Levels of processing effect"},
      {"name": "Absent-mindedness"},
      {"name": "Testing effect"},
      {"name": "Next-in-line effect"},
      {"name": "Google effect"},
      {"name": "Tip of the tongue phenomenon"}

     ]
    }

   ]
  }

 ]
};


function currentDay() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);

    return day;
}

function getBiases() {

    var biases = [];

    data.children.forEach(function(item){

        var bias = {
            group: item.name
        };
        item.children.forEach(function(item){
            bias.description = item.name;
            item.children.forEach(function(item){
                bias.bias = item.name;
                biases.push(Object.assign({}, bias));
            });
        });

    });

    return biases;

}


var biases = getBiases();
var biasIndex = currentDay() % biases.length;

wikipedia.searchArticle({query: biases[biasIndex].bias, format: "html", summaryOnly: true}, function(err, result){

    //Get wikipedia
    var lines = [];

    try {

        if(err) {
            lines.push('Wikipedia not available');
            lines.push('Please check your internet connection');
        } else {
            var currentLine = '';
            result = striptags(result).split(' ');
            result.forEach((word, i) => {
                currentLine += ' '+word;
                if(i%12 === 0 && i >0) {
                    lines.push(currentLine);
                    currentLine = '';
                } else {

                }
            });
        }

        if(lines.length === 0) {
            lines.push(`Unable to find '${biases[biasIndex].bias}' on Wikipedia 😞`);
        }
    } catch (e) {
        lines = ['There was an error getting more info from Wikipedia 😅, please refresh'];
    }
   

    //Send result
    bitbar([
        {
            text: '💡',
            dropdown: false
        },
        bitbar.sep,
        {
            text: biases[biasIndex].bias,
            color: '#34860D',
            href: 'https://en.wikipedia.org/w/index.php?search=' + biases[biasIndex].bias
        },
        bitbar.sep,
        {
            text: biases[biasIndex].group.substr(2, biases[biasIndex].length),
            color: '#34860D'
        },
        bitbar.sep,
        {
            text: biases[biasIndex].description,
            color: '#34860D'
        },
        bitbar.sep,
        {
            text: lines.join("\n")
        },
        bitbar.sep,
        {
            text: `📅 Day ${currentDay()}, biase #${biasIndex} of ${biases.length} total`
        }
    ]);


});
