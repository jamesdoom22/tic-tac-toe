
import sessionModel from "./models/session.js";

export const getSession = async (req, res) => {
  try {
    console.log("Session ID: ", req.params.id);
    if (req.params.id === 'null') {
      let session = new sessionModel();
      session.save();
      res.status(200).json({ message: "Session created.", session });
      console.log("🚀 ~ file: apiController.js:11 ~ getSession ~ newSession:", session)
    } else {
      let session = await sessionModel.findOne({ _id: req.params.id });
      res.status(200).json({ message: "Session found.", session });
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// export const googleLogin = async (req, res) => {
//   try {
//     console.log("🚀 ~ file: apiController.js:6 ~ googleLogin ~ req:", req)

//   } catch (error) {
//     res.status(404).json({ message: error.message })
//   }
// }

// export const getStats = async (req, res) => {
//   try {
//     const { email, googleId, name } = req.params;
//     const findUser = await UserModel.findOne({ email });

//     if (!findUser) {
//       //If user is not yet registered, create new document
//       const newData = new UserModel({ email, googleId, name });
//       await newData.save();
//       res.status(200).json({ message: "Successfully created.", type: "post", data: newData });
//     } else {
//       //If user already exist, get info
//       res.status(200).json({ message: "User data info found.", type: "get", data: findUser });
//     }
//   } catch (error) {
//     res.status(404).json({ message: error.message })
//   }
// }

// export const getAdmin = async (req, res) => {
//   try {
//     const { email } = req.params;
//     let adminEmails = ['looksfamdev@gmail.com']
//     let user = false
//     if (adminEmails.includes(email)) {
//       user = true
//     }
//     res.status(200).json({ user });
//   } catch (error) {
//     res.status(404).json({ message: error.message })
//   }
// }
// export const testfunc = async (req, res) => {
//   try {
//     let whiteList = ["jdominique.carcueva@gmail.com", "leovar037@gmail.com", "cadiena420@gmail.com", "maricelpardillo234@gmail.com", "sebastienrepollo0228@gmail.com", "pcgerago8@gmail.com", "radocknavales@gmail.com", "kinglouisjoy@gmail.com", "kentlabajo18@gmail.com", "joshuamontenegro143@gmail.com", "abbyabrao@gmail.com", "jessrhyl12@gmail.com", "joshuaoliver763@gmail.com", "claive.e.bitoon@gmail.com"]

//     for (let i = 0; i < whiteList.length; i++) {
//       const element = whiteList[i];
//       const findUser = await UserModel.findOne({ email: element });
//       if (!findUser) {
//         const newData = new UserModel({ email: element });
//         if (whiteList.includes(element)) newData.premium = true;
//         await newData.save();
//       }
//     }
//     res.status(200).json({ message: "Test Function Successfully Execute.", type: "test" });
//   } catch (error) {
//     res.status(404).json({ message: error.message })
//   }
// }

// export const postQuestion = async (req, res) => {
//   try {
//     const data = req.body;
//     console.log("🚀 ~ file: apiController.js:141 ~ postQuestion ~ data:", data)
//     const newQuestion = new QuestionModel(data);
//     newQuestion.save();
//     console.log("🚀 ~ file: apiController.js:70 ~ postQuestion ~ newQuestion:", newQuestion)
//     res.status(200).json(newQuestion);
//   } catch (error) {
//     res.status(404).json({ message: error.message })
//   }
// }

// export const updateQuestion = async (req, res) => {
//   try {

//     const { _id } = req.params;
//     const data = req.body;
//     let message = ''
//     QuestionModel.findOneAndUpdate({ _id }, data)
//       .then((updatedDocument) => {
//         if (updatedDocument) {
//           // Handle the success case
//           message = `Question ID: ${_id} successfully updated.`
//           console.log(message);
//           res.status(200).json({ message });
//         } else {
//           // Handle the case when no document is found
//           message = `Question ID: ${_id} not found.`
//           console.log(message);
//           res.status(404).json({ message });
//         }
//       })
//       .catch((error) => {
//         console.error('Error updating document:', error);
//         // Handle the error case
//       });
//   } catch (error) {
//     res.status(404).json({ message: error.message })
//   }
// }

// export const deleteQuestion = async (req, res) => {
//   try {
//     const { _id } = req.params;
//     let message = ''
//     QuestionModel.findOneAndDelete({ _id })
//       .then((updatedDocument) => {
//         if (updatedDocument) {
//           // Handle the success case
//           message = `Question ID: ${_id} successfully deleted.`
//           console.log(message);
//           res.status(200).json({ message });
//         } else {
//           // Handle the case when no document is found
//           message = `Question ID: ${_id} not found.`
//           console.log(message);
//           res.status(404).json({ message });
//         }
//       })
//       .catch((error) => {
//         console.error('Error updating document:', error);
//         // Handle the error case
//       });
//   } catch (error) {
//     res.status(404).json({ message: error.message })
//   }
// }

// export const patchSetting = async (req, res) => {
//   try {
//     const { item } = req.params;
//     const data = req.body;
//     let message = ''
//     if (item === 'subject' || item === 'email') {
//       const options = { new: true };
//       SettingModel.findOneAndUpdate({}, { [item]: data }, options)
//         .then((updatedDocument) => {
//           if (updatedDocument) {
//             // Handle the success case
//             message = item === 'subject' ? `Subject successfully updated.` : item === 'email' ? `Email successfully updated.` : ''
//             res.status(200).json({ message });
//           } else {
//             // Handle the case when no document is found
//             message = item === 'subject' ? `Update subject error.` : item === 'email' ? `Update email error.` : ''
//             res.status(404).json({ message });
//           }
//         })
//         .catch((error) => {
//           console.error('Error updating document:', error);
//           // Handle the error case
//         });
//     }
//   } catch (error) {
//     res.status(404).json({ message: error.message })
//   }
// }

// export const getSetting = async (req, res) => {
//   try {
//     let data;
//     const { item } = req.params;
//     console.log("🚀 ~ getSetting ~ item:", item)
//     if (item === 'subject' || item === 'email') {
//       const settingsData = await SettingModel.find();
//       if (!settingsData[0]) {
//         //One time execute condition
//         const newSetting = new SettingModel();
//         newSetting.save();
//         console.log(newSetting);
//         data = newSetting[0][item];
//       }
//       else { data = settingsData[0][item]; }
//     }
//     if (item === 'question') {
//       const questionsData = await QuestionModel.find().sort({ createdAt: -1 });
//       data = questionsData;
//     }
//     console.log("🚀 ~ file: apiController.js:185 ~ getSetting ~ data:", data)
//     res.status(200).json({ data });
//   } catch (error) {
//     res.status(404).json({ message: error.message })
//   }
// }

// export const getUser = async (req, res) => {
//   try {
//     let data;
//     const { item } = req.params;
//     console.log("🚀 ~ getSetting ~ item:", item)
//     // const newSetting = new UserModel({email:'jdom2'});
//     // newSetting.save();
//     let query = {}
//     if (item === 'whitelist') {
//       query = { type: 'Whitelist' }
//     }
//     const usersData = await UserModel.find(query);
//     data = usersData;
//     res.status(200).json({ data });
//   } catch (error) {
//     res.status(404).json({ message: error.message })
//   }
// }

// export const postUser = async (req, res) => {
//   try {
//     let data;
//     const { item } = req.params;
//     console.log("🚀 ~ getSetting ~ item:", item)
//     if (item === 'whitelist') {
//       const settingsData = await UserModel.find();

//     }
//     if (item === 'question') {
//       const questionsData = await QuestionModel.find().sort({ createdAt: -1 });
//       data = questionsData;
//     }
//     res.status(200).json({ data });
//   } catch (error) {
//     res.status(404).json({ message: error.message })
//   }
// }


// //--------------------ONE TIME RUN FUNCTIONS--------------------\\

// //add 8130 questions to live
// const subjects = [
//   { subject: 'MESL', topics: ['Coaching Economics', 'Coaching Laws', 'Elements Coaching Phase 1', 'Elements Coaching Phase 2', 'Preboard Prime', 'VIT 1 MESL 1', 'VIT 1 MESL 2', 'VIT 2 MESL 1', 'VIT 2 MESL 2', 'VIT 3 MESL 1', 'VIT 3 MESL 2'] },
//   { subject: 'MDSP', topics: ['BOOKLET MDSP', 'MDSP Coaching Phase 1', 'MDSP Coaching Phase 2', 'MDSP Coaching Phase 3', 'MD Pre-board', 'MD CNS', 'Elements Coaching', 'Problems Coaching', 'Pocket Evaluation 11', 'Pocket Evaluation 12', 'Pocket Evaluation 13', 'Pocket Evaluation 14'] },
//   { subject: 'Machine Design Elements', topics: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6', 'Test 7', 'Test 8', 'Test 9', 'Test 10', 'Test 11', 'Test 12', 'Test 13', 'Test 14', 'Test 15', 'Test 16', 'Test 17'] },
//   { subject: 'Pipe', topics: ['CHILLER 1', 'CHILLER 2', 'CHILLER 3', 'PIPE ALCORCON', 'PIPE ADDITIONAL', 'PIPE ELEMENTS 1', 'PIPE ELEMENTS 2', 'PIPE ELEMENTS 3', 'PIPE ELEMENTS 4', 'PIPE PROBLEMS A', 'PIPE PROBLEMS B', 'PIPE PROBLEMS C', 'PIPE PROBLEMS D', 'VHT PIPE (TOP THE BOARD)', 'VIP PIPE (HAMMER)', 'VIT - 1 (TOP THE BOARD)'] },
//   { subject: 'Redbook', topics: ['Algebra', 'Analytic Geometry', 'Calculus', 'Economics', 'Miscelaneous 1', 'Miscelaneous 2', 'Physics', 'Plane and Solid Geometry'] },
//   { subject: 'VIP', topics: ['VIP 1', 'VIP 2', 'VIP 3', 'VIP 4', 'VIP 5'] }
// ];
// // import { all } from "./decode/all.js";
// // export const addAllQuestionToLive = async (req, res) => {
// //   try {
// //     const now = new Date();
// //     const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
// //     console.log(time);
// //     let dataQues = []
// //     let index = 0;
// //     for (let a = 0; a < subjects.length; a++) {
// //       const subject = subjects[a];
// //       console.log("🚀 ~ subject:", subject.subject)
// //       for (let b = 0; b < subject.topics.length; b++) {
// //         const topic = subject.topics[b];
// //         console.log(`🚀 ~ topic: ${topic} (${all[index].length})`)
// //         for (let c = 0; c < all[index].length; c++) {
// //           const question = all[index][c];
// //           question.subject = subject.subject;
// //           question.topic = topic
// //           dataQues.push(question)
// //         }
// //         index++
// //       }
// //     }
// //     QuestionModel.insertMany(dataQues)
// //       .then(result => {
// //         console.log(`${result.length} documents inserted`);
// //         // Handle the successful insertion
// //         const now2 = new Date();
// //         const time2 = now2.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
// //         console.log(time2);
// //         console.log(now2 - now);
// //       })
// //       .catch(err => {
// //         console.error('Failed to insert documents:', err);
// //         // Handle the error
// //       });
// //     res.status(200).json({ "DONE": "DONE", dataQues });
// //   } catch (error) {
// //     res.status(404).json({ message: error.message })
// //   }

// // }

// //decode html to readable data
// export const decodeHTML = async (req, res) => {
//   try {
//     let test = ``
//     let arr = test.split('<flow htmlhint="questioncontainer">')
//     //remove index 0
//     arr.shift();
//     //remove odd index that is duplicate
//     for (var i = 0; i < arr.length; i++) {
//       arr.splice(i + 1, 1);
//     }

//     let filterd = [];
//     for (var i = 0; i < arr.length; i++) {
//       let item = arr[i].substring(0, arr[i].indexOf('/response_lid'))
//       let data = {
//         choices: [],
//         correctAnswer: "",
//         question: "",
//         topic: "NA",
//       }
//       let inner1 = item;
//       let inner1Arr = inner1.split('<mattext texttype="text/html">');
//       inner1Arr.shift();
//       let question1 = inner1Arr[0].substring(0, inner1Arr[0].indexOf('</mattext>')).replace(/[\r\n]/gm, '');
//       data.question = question1.replace('    ', ' ');

//       let inner1Arr2 = inner1.split('<response_label');
//       inner1Arr2.shift();
//       for (var a = 0; a < inner1Arr2.length; a++) {
//         let choice = inner1Arr2[a]
//         let str = choice.substring(choice.indexOf('/html\">') + 7, choice.indexOf('</mattext>'))

//         data.choices.push(str)
//         if (choice.includes(`10`)) {

//           data.correctAnswer = str
//         }

//       }

//       console.log(data, "")
//       filterd.push(data)
//     }
//     console.log("🚀 ~ Number of questions: ", filterd.length)
//     setTimeout(() => res.status(200).json({ filterd }), 1000)
//   } catch (error) {
//     res.status(404).json({ message: error.message })
//   }
// }