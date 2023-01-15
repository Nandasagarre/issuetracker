const project = require('../models/project');
const bug = require('../models/bug');
//var projects = {};
module.exports.showHome = async function (req, res) {
    const Allprojects = await project.find({});

    res.render('home', { p: Allprojects });
}

module.exports.showCreateProject = function (req, res) {
    res.render('createProject')
}

module.exports.showCreateBug = function (req, res) {
    //create a bug and linked to prject
    console.log('id proi', req.params['id']);
    res.render('createBug')
}

//module.exports.getAllprojects = async function (req, res) {
//    //model.findAllById(); map each project and render in EJS
//    const allProjects = await project.find({});
//    res.render('')
//}

module.exports.getPrpjectDetails = function (req, res) {

    if (typeof req.query.search != 'undefined' || typeof req.query.author != 'undefined') {
        
        let tagArray = req.query.search.split(' ');
        let author = req.query.author;

        const id = req.params['id'];

        console.log(author, tagArray)

        project.findById(id, (err, project) => {
            if (err) { //console.log('error in finding project', err); 
            }
            if (typeof project == 'undefined') {
                return;
            }
            const id = project.id;
           // console.log("project", project)
            bug.find({
                projectid: id,
                $or: [
                    { bauthor: author },
                    { tag: { $all: tagArray } }
                ]
            }, (err, bugs) => {
                console.log("bugs", bugs);
                    res.render('projectDetails', { pdeatils: project, bugs: bugs });
                
                
                
            })

                //, tag: { $all: tagArray }  bauthor: author
        })
    } else {

        const id = req.params['id'];

        project.findById(id, (err, project) => {
            if (err) { //console.log('error in finding project', err); 
            }
            if (typeof project == 'undefined') {
                return;
            }
            const id = project.id;
            bug.find({ projectid: id }, (err, bugs) => {
                //console.log(bugs);
                res.render('projectDetails', { pdeatils: project, bugs: bugs });
            })


        })
    }
   
   
    
    
}

module.exports.createProject = function (req, res) {
    //create the new project entry in DB
    const Newproject = {
        pname: req.body.pname,
        pauthor: req.body.pauthor,
        pdesc: req.body.pdesc
    }
    project.create(Newproject, (err) => {
        if (err) { console.log('error in creating project', err); return; }
        else {
            console.log("Project created");
            res.redirect('/')
        }
    })
    
}

module.exports.createBug = function (req, res) {
    //create a bug and linked to prject
    var tag = [];
    if (req.body.tag.length > 0) {
        tag = req.body.tag.split(' ');
    }
    const Newbug = {
        projectid: req.params['id'],
        bname: req.body.bname,
        bauthor: req.body.bauthor,
        bdesc: req.body.bdesc,
        tag: tag
    };

    bug.create(Newbug, (err) => {
        if (err) { console.log('error in creating bug', err); return; }
        else {
            console.log("bug/issue created");
            res.redirect('back');
        }
    })
    
}
