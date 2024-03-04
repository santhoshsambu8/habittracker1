const Habits = require('../models/habit');
const Status = require('../models/status');


function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth()+1);
    const day = String(date.getDate());
    return `${year}-${month}-${day}`;
  }


module.exports.weekView= async function(req,res)
{
    try{



        const endDate = new Date();

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 6);

        const dates = [];

        console.log("apple",dates)
        if (true){

        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dates.push(`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString()}-${(currentDate.getDate()).toString()}`);
            
            currentDate.setDate(currentDate.getDate() + 1);
        }

        }

        console.log(dates);
        
        let habit_list = await Habits.find({});

        for (let habit of habit_list){

            for(let i = 0; i<dates.length;i++){

                let status = await Status.findOne({habitid:habit._id,datestring:dates[i]});
    
                if (status == null){
    
                    let date= await Status.create(
                        {
                            date: new Date(dates[i]),
                            datestring: dates[i],
                            habitstatus:'None',
                            habitid:habit._id
                        }
                    )
        
                    habit.status.push(date);
    
                }
    
              }
    
              habit.save();

        }
          
        let habits = await Habits.find({}).populate({
            path: 'status',
            options: { sort: { date: -1 }, limit: 7 } // Sorting by createdAt in descending order to get the latest record
          });

        let currentDate = new Date();

        const date = formatDate(currentDate);

        res.render('./weekView',{
            habits:habits,
            currdate:date,
            
        }
        )

    }
    catch (error) {
        console.log('Error', error);
    }
}

module.exports.toggleStatus=async function(req,res)
{
    try {

        // console.log(req.body);
        let status = await Status.findOne({habitid:req.query.id,date:req.query.date})

        status.habitstatus = req.query.status;

        status.save();

       
        return res.redirect('back');

    } catch (error) {
        console.log('Error', error);
    }
    
}