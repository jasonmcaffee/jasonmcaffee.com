define([
    'core/core'
], function(core){
    core.log('Resume Model module loaded.');

    var ResumeModel = core.mvc.Model.extend({
        defaults:{
           summary:{
                paragraphs:[
                    "Highly skilled software engineer with a strong passion for technology, and nearly 10 years experience.  Experience in both enterprise and startup environments."
                ]
           },
           employment:{
               items:[
                   {
                       title: "Mobile Architect Lead, VP",
                       employer: "JP Morgan Chase",
                       date:"Nov 11 - Mar 13",
                       summary:{
                           paragraphs:[
                                "Application architecture and javascript framework development for the mobile version of chase.com."
                           ]
                       },
                       primarySkills:"javascript, css3, html 5, SPA, mobile, team lead, application architecture, nosql, scrum, unit testing, responsive".split(","),
                       toolsAndLibs:"backbone, require.js, handlebars, node.js, sass, jquery mobile, mongo db, express, modernizr, grunt, jenkins, mingle, jasmine, git, subversion".split(",")
                   },
                   {
                       title: "Consultant",
                       employer: "Self Employed (Side Work)",
                       date:"Apr 08 - Nov 09",
                       summary:{
                           paragraphs:[
                               "Developed a desktop application for Coca Cola water treatment facilities worldwide."
                           ]
                       },
                       primarySkills:"c# .net, xml schema design".split(","),
                       toolsAndLibs:".net, visual studio".split(",")
                   },
                   {
                       title: "Developer Lead, VP",
                       employer: "JP Morgan Chase",
                       date:"Jul 07 - Nov 11",
                       summary:{
                           paragraphs:[
                               "Application architecture and C# .NET framework development for chase.com."
                           ]
                       },
                       primarySkills:"c# .net, javascript, css, html, database design, web service design, team lead, application architecture".split(","),
                       toolsAndLibs:".net mvc, jquery, razor, velocity, structuremap, ms sql, ms mq, web forms, wcf, wf, clearcase".split(",")

                   },
                   {
                       title: "Senior Consultant",
                       employer: "Sogeti",
                       date:"Oct 05 - July 07",
                       summary:{
                           paragraphs:[
                               "Java and C# .net consultant on projects for Ohio Department of Public Safety, Mettler Toledo, and Relay Gear."
                           ]
                       },
                       primarySkills:"java, c# .net, javascript, html, css, database design, web services, pl/sql".split(","),
                       toolsAndLibs:"struts, jsp, oracle db, ms sql, biztalk, vss".split(",")

                   },
                   {
                       title: "Consultant",
                       employer: "The Technology Group",
                       date:"Jan 04 - Oct 05",
                       summary:{
                           paragraphs:[
                               "Systems administrator and developer for several local businesses and non-profits."
                           ]
                       },
                       primarySkills:"javascript, html, css, flash, c# .net, VOIP, vb script, systems admin, network admin, database design, clustering".split(","),
                       toolsAndLibs:"asterisk, cisco, linux, windows server, terminal services".split(",")

                   }
               ]
           },
           workProjects:[
               {
                   name: "m.chase.com",
                   summary:{
                       paragraphs:[
                            "Developed a mobile web, single page application, using MVC and client side templating.",
                            "Created javascript and css framework for navigation, transitions, validation, service calling, UI components, etc.",
                            "Lead a team of developers both remotely(off shore) and on site, via verbal communication, documentation, and code reviews.",
                            "Created a build system using node.js, SASS, Handlebars, grunt, and require.js.",
                            "Created an automated performance testing tool for clientside performance metrics to be gathered and reported with each CI build."
                       ]
                   }
               },
               {
                   name: "www.chase.com",
                   summary:{
                       paragraphs:[
                           "Developed and maintained C# .NET framework used by 18 web applications.",
                           "Helped to develop various applications throughout the site, including: originations, blueprint, and payments and transfers.",
                           "Built an asynchronous message processing service, which is used to collect and store over 9 million transactions per day.",
                           "Developed complex common web components, including a workflow engine for pages, client-side validation, data grid, etc."
                       ]
                   }
               },
               {
                   name: "Coca Cola",
                   summary:{
                       paragraphs:[
                           "Developed a desktop application for Coca Cola water treatment facilities.  The application was designed to assist in improving water treatment efficiency throughout the treatment process. The app included several complex calculations used throughout many phases of the water treatment process, and allowed users to make virtual adjustments to help obtain better efficiency."
                       ]
                   }
               },
               {
                   name: "Electronic Titling Application",
                   summary:{
                       paragraphs:[
                           "Developed and maintained multithreaded java application with pl/sql oracle database, and c# .net web services, which allowed dealerships to electronically title vehicles."
                       ]
                   }
               },
               {
                   name: "Electronic Scale Calibration",
                   summary:{
                       paragraphs:[
                           "Helped develop and maintain a desktop application used by engineers in the field when calibrating industrial scales."
                       ]
                   }
               }
           ],
           personalProjects:[
               {
                   name: "jasonmcaffee.com",
                   summary:{
                       links:["https://github.com/jasonmcaffee/jasonmcaffee.com"],
                       paragraphs:[
                           "Web application built using strapkit for blogging, my resume, pictures, etc."
                       ]
                   }
               },
               {
                   name: "strapkit",
                   summary:{
                       links:["https://github.com/jasonmcaffee/strapkit"],
                       paragraphs:[
                           "Open source framework for single page applications, including support for mobile."
                       ]
                   }
               },
               {
                   name: "ui design tools",
                   summary:{
                       links:["https://github.com/jasonmcaffee/uiDesignTools"],
                       paragraphs:[
                           "Open source web gui for generating css (gradients, colors, etc)"
                       ]
                   }
               },
               {
                   name: "node music",
                   summary:{
                       links:["https://github.com/jasonmcaffee/nodeMusic/tree/master/nodeMusic3"],
                       paragraphs:[
                           "Open source web application built on node.js for accessing your music library via the web."
                       ]
                   }
               },
               {
                   name: "chordical",
                   summary:{
                       links:[],
                       paragraphs:[
                           "Flash application which uses music theory to allow you to generate, manipulate, play, and record chord progressions."
                       ]
                   }
               }
           ],
           education:{
               degree:"Bachelor of Science Degree in Computer Information Systems",
               gpa:"3.70 GPA Magna Cum Laude",
               school:"DeVry University"
           },
           certifications:[
               "Sun Certified Java Programmer",
               "Sun Certified Java Web Component Developer",
               "A+ Certification"
           ]
        }
    });

    return ResumeModel;
});