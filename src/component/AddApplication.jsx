import { useState } from "react";
import "./AddApplication.css";
function AddApplication({ setApplications, applications, showToast }) {
    // 👇 NAYA STATE: Form ko hide/show karne ke liye (Default: false yaani band rahega)
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [form, setForm] = useState({
        companyName: "",
        address: "",
        jobTitle: "",
        datePosted: "",
        notes: "",
        reminderDate: "",
        status: "applied"
    });

    const handleAdd = () => {
        if (form.companyName === "" || form.jobTitle === "" || form.datePosted === "" || form.address === "") {
            showToast("All fields are required ⚠️", "warning");
            return;
        }

        const newJob = {
            id: Date.now(),
            ...form
        }
        setApplications([...applications, newJob]);
        showToast("Job Added Successfully ✅", "success");

        // Form reset karna
        setForm({
            companyName: "",
            address: "",
            jobTitle: "",
            datePosted: "",
            notes: "",
            reminderDate: "",
            status: "applied"
        });

        setIsFormVisible(false);
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value.toUpperCase() });
    }

    return (
        <div className="add-job-section">
            
          
            {!isFormVisible ? (
                <button className="toggle-form-btn" onClick={() => setIsFormVisible(true)}>
                    + ADD NEW JOB
                </button>
            ) : (
                /* AGAR FORM KHULA HAI TOH INPUTS DIKHAO */
                <div className="form-container">
                    {/* 👇 Inputs ke liye naya 2 Column Grid 👇 */}
                    <div className="form-grid">
                        <input type="text" placeholder="Enter Company Name" value={form.companyName} name="companyName" onChange={handleChange} />
                        <input type="text" placeholder="Enter Company Address" value={form.address} name="address" onChange={handleChange} />
                        <input type="text" placeholder="Enter Job Title" value={form.jobTitle} name="jobTitle" onChange={handleChange} />
                        
                        <input type="date" name="datePosted" value={form.datePosted} onChange={handleChange} onClick={(e) => e.target.showPicker()} title="Date Posted" />
                        
                        <input type="text" placeholder="Enter Description" name="notes" value={form.notes} onChange={handleChange} />
                        
                        <input type="date" name="reminderDate" value={form.reminderDate} onChange={handleChange} onClick={(e) => e.target.showPicker()} title="Reminder Date" />
                    </div>

                    {/* 👇 Naye Action Buttons (Cancel aur Add) 👇 */}
                    <div className="form-actions">
                        <button className="cancel-btn" onClick={() => setIsFormVisible(false)}>CANCEL</button>
                        <button className="submit-job-btn" onClick={handleAdd}>ADD JOB TO LIST</button>
                    </div>
                </div>
            )}
            
        </div>
    )
}

export default AddApplication;