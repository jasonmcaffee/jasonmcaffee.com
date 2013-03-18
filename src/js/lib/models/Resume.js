define([
    'core/core'
], function(core){
    core.log('Resume Model module loaded.');

    var ResumeModel = core.mvc.Model.extend({
        defaults:{
           employment:{
               items:[
                   {
                       title: "Mobile Architect Lead, VP",
                       employer: "JP Morgan Chase",
                       date:"Nov 09 - Mar 13",
                       summary:{
                           paragraphs:[
                                "Application architecture and javascript framework development for the mobile version of chase.com."
                           ]
                       },
                       primarySkills:[
                        "javascript", "css 3", "html 5"
                       ],
                       toolsAndLibs:[
                        "backbone", "node.js"
                       ]
                   },
                   {
                       title: "Consultant",
                       employer: "Self Employed (Side Work)",
                       date:"Apr 08 - Nov 09",
                       summary:{
                           paragraphs:[
                               "Developed a desktop application for Coca Cola water treatment facilities.  The application was " +
                                   "designed to assist in improving water treatment effeciency throughout the treatment process. "
                           ]
                       },
                       primarySkills:[
                           "c# .net", "xml schema design"
                       ],
                       toolsAndLibs:[
                           ".net", "visual studio"
                       ]
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
                       primarySkills:[
                           "c# .net", "javascript", "css", "html", "database design", "team lead", "architect", "web services", "xml schema design"
                       ],
                       toolsAndLibs:[
                           ".net", "visual studio"
                       ]

                   },
                   {
                       title: "Senior Consultant",
                       employer: "Sogeti",
                       date:"Oct 05 - July 07",
                       summary:{
                           paragraphs:[
                               "Programming in Java in SOA with Websphere MQ and ORACLE DB backend.",
                               "Programming in Java for web applications using STRUTS, Servlets, and JSP.",
                               "Programming in ORACLE PL/SQL for business logic and transaction processing across multiple databases.",
                               "Programming in C# .Net for Web Services (Biztalk ,SOA), ASP .Net web applications, and Windows applications.",
                               "XML Schema design for use with Biztalk in validating XML transactions sent via Web Services."
                           ]
                       },
                       primarySkills:[
                           "java","c# .net", "javascript", "css", "html", "database design", "web services", "xml schema design"
                       ],
                       toolsAndLibs:[
                           "eclipse", ".net", "visual studio"
                       ]

                   },
                   {
                       title: "Consultant",
                       employer: "The Technology Group",
                       date:"Jan 04 - Oct 05",
                       summary:{
                           paragraphs:[
                               "Programming in Java, C# .Net, Asp, VB, SQL, and JavaScript.  Database development in MySQL, including clustering.  VOIP development and implementation using Asterisk PBX.",
                               "Terminal Services deployment and administration. Network development, implementation, and administration in both Windows Server and Linux environments. "
                           ]
                       },
                       primarySkills:[
                           "c# .net", "javascript", "css", "html", "database design", "database clustering", "voip", "flash", "actionscript", "vb script", "cisco phone programming", "system admin"
                       ],
                       toolsAndLibs:[
                           "asterisk", "redhat linux", "windows server"
                       ]

                   }
               ]
           },
           projects:[
               {
                   name: "m.chase.com",
                   summary:{
                       paragraphs:[
                        "did stuff", "more stuff"
                       ]
                   }
               },
               {
                   name: "www.chase.com",
                   summary:{
                       paragraphs:[
                           "did stuff"
                       ]
                   }
               },
               {
                   name: "Coca Cola",
                   summary:{
                       paragraphs:[
                           "did stuff"
                       ]
                   }
               },
               {
                   name: "Electronic Titling Application",
                   summary:{
                       paragraphs:[
                           "did stuff"
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