import Express from "express"
import mongoose from "mongoose"
import cors from "cors"

const app = Express();
const port = 3000;
app.use(cors());
app.use(Express.json());


mongoose.connect('mongodb+srv://yonatandu:LGl7HEVXhQJaTqiP@cluster0.bhjh4.mongodb.net/sv-test')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
});

const employeeSchema = new mongoose.Schema({
    name: String,
    department: String,
    age: Number,
    salary: Number
});

const employeeModel = mongoose.model('employees', employeeSchema);


app.post('/addEmployee', async (req, res) => {
    try { // add employee to the database
        const newEmployee = await employeeModel.create(req.body);
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ error: 'Failed to add employee' });
    }
});

app.delete('/deleteEmployeeS/:age', async (req, res) => {
    try {
        await employeeModel.deleteMany({ age: { $gte: req.params.age } });
        res.status(205).json({ message: 'Employees deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ error: 'Failed to delete employee' });
    }
});

app.put('/changeDepartment', async (req, res) => {
    const { oldDept, newDept } = req.body;
    try{
        await employeeModel.updateMany({ department: oldDept }, { department: newDept });
        res.status(200).json({message: 'Department updated successfully'});
    } catch (error) {
        console.error('Error updating department:', error);
        res.status(500).json({ error: 'Failed to update department' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});