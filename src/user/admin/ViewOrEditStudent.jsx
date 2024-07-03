import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentTable from './StudentTable';

const Academic = ({ userDetail }) => {
  const [batchNo, setBatchNo] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [userIDError, setUserIDError] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

//   useEffect(() => {
    const handleSubmitRollNo = async () => {
        const studentDetails = { batch: batchNo, class: studentClass, rollNo: rollNo };
        try {
          setLoading(true);
          const response = await axios.post('http://localhost:3000/student-admin', studentDetails);
          setStudentData(response.data);
        } catch (error) {
          console.error('Error fetching academic data:', error);
          setUserIDError('Error fetching academic data');
        } finally {
          setLoading(false);
        }        
    };

//     fetchData();
//   }, [batchNo, studentClass, rollNo]);

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/save-data', studentData);
      console.log('Changes saved successfully!', response.data);
    } catch (error) {
      console.error('Error saving changes:', error);
      setUserIDError('Error saving changes');
    } finally {
      setLoading(false);
      setEditMode(false);
    }
  };

  const handleAddRow = () => {
    setStudentData([...studentData, { batch: '', department: '', roll_no: '', name: '', semester: '', course_id: '', course_name: '', grade: '' }]);
  };

  if (!userDetail) {
    return <div>Loading...</div>;
  }

  const userName = userDetail.email.split('@')[0];

  return (
    <div className="profile-class">
      <div className="profile-class-2">
        <div className="profile-heading">
          <h5 className="profile-heading-text">View Student Academic</h5>
        </div>

        <div className="table-class" style={{ backgroundColor: 'yellowgreen' }}>
          <div className="view-students">            

            <div className="input-field">
              <input
                type="text"
                className={`${userIDError ? 'is-invalid' : ''}`}
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
              />
              <label>Enter Student's RollNo</label>
              {userIDError && <div className="invalid-feedback">{userIDError}</div>}
            </div>
            <button onClick={()=>handleSubmitRollNo()}>submit</button>

            {!editMode ? (
              <button onClick={() => setEditMode(true)}>Edit</button>
            ) : (
              <>
                <button onClick={handleSaveChanges} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button onClick={handleAddRow}>Add Row</button>
              </>
            )}

            <div className="data-table">
              {studentData.length > 0 && (
                <StudentTable
                  data={studentData}
                  setData={setStudentData}
                  editMode={false}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academic;
