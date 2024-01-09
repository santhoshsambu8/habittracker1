const Habits = require('../models/habits');
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
            options: { sort: { date: -1 }, limit: 1 } // Sorting by createdAt in descending order to get the latest record
          });

          const today = new Date();
          let date  = formatDate(today);

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
        for (let i = 0; i < 7; i++) {

            let previousDate = new Date();
            previousDate.setDate(today.getDate() - i);
            
            let date= await Status.create(
                {
                    date:formatDate(previousDate),
                    habitstatus:'None',
                    habitid:habit._id
                }
            )

            habit.status.push(date);
            habit.save();


        }

        return res.redirect('back');

        
    } 
    
    catch (error) {
        console.log('Error', error);
    }
    
}