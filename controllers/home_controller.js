const Habits = require('../models/habit');
const Status = require('../models/status');



function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth()+1);
    const day = String(date.getDate());
    return `${year}-${month}-${day}`;
  }



  module.exports.home = async function(req,res)
{
    try{

        let habits = await Habits.find({}).populate({
            path: 'status',
            // Sorting by createdAt in descending order to get the latest record
          });

        //   let habits = await Habits.find({}).populate({path:'status'});


       
          const today = new Date();
          let date  = formatDate(today);

        //   console.log(habits[0].status[0].date.split('-')[2]);

        res.render('./home',{
            habits:habits,
            currdate:date
        }
        )

    }
    catch (error) {
        console.log('Error', error);
    }
    
}
  



module.exports.create=async function(req,res)
{
    try {

        console.log(req.body);
        let nameValue = (req.body.custom_meal);

        let habit = await Habits.findOne({ name: nameValue });

        if (habit) {
            console.log('Habit Already Exists')
            return res.redirect('back');
        }

        habit = await Habits.create({
            name:nameValue
        })

        const today = new Date();
            
            let date= await Status.create(
                {
                    date:formatDate(today),
                    datestring: formatDate(today),
                    habitstatus:'None',
                    habitid:habit._id
                }
            )

            habit.status.push(date);
            


        // }
        habit.save();

        return res.redirect('back');

        
    } 
    
    catch (error) {
        console.log('Error', error);
    }
    
}


module.exports.toggleStatus = async function(req,res)
{
    try {   

          let habit = await Habits.findOne({ _id: req.query.id });
          let status = await Status.findOne({habitid:req.query.id,date:formatDate(new Date())});

          if (status == null){

            let date= await Status.create(
                            {
                                date:formatDate(new Date()),
                                habitstatus:req.query.status,
                                habitid:req.query.id
                            }
                        )
            
            habit.status.push(date);


          }

          else{

            status.habitstatus=req.query.status;
            status.save();

          }


        return res.redirect('back');

    } 
    
    catch (error) {
        console.log('Error', error);
    }
    
}

module.exports.delete=async function(req,res)
{
    try {

        await Habits.deleteOne({_id: req.params.id});

        await Status.deleteMany({habitid:req.params.id});

        return res.redirect('back')
        
    } catch (error) {
        console.log('Error', error);
    }
}