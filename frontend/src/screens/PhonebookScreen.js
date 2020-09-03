import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listContacts, deleteContact, saveContact } from '../actions/contactActions';
import MaterialTable from 'material-table';
import tableIcons from '../components/util';


function PhonebookScreen() {
  const contactList = useSelector(state => state.contactList); // eslint-disable-next-line
  const { loading, contacts, error } = contactList;

  const contactSave = useSelector(state => state.contactSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = contactSave; // eslint-disable-next-line

  const contactDelete = useSelector(state => state.contactDelete); // eslint-disable-next-line
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = contactDelete;

  const isValidPhone = (phoneNumber) => {
    var found = phoneNumber.search(/^(?:\+?88)?01[135-9]\d{8}$/);
    if (found > -1) {
      return true;
    }
    else {
      return false;
    }
  }

  const dispatch = useDispatch();
  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    if (isMounted) {
      document.title = "Phonebook";
      dispatch(listContacts());
    }
    return () => { isMounted = false };
  }, [successSave, successDelete, dispatch]);

  // eslint-disable-next-line
  const [columns, setColumns] = useState([
    {
      title: 'Name', field: 'name',
      validate: rowData => { return rowData.name ? { isValid: true } : { isValid: false, helperText: "Need name" } }
    },
    {
      title: 'Phone Number',
      field: 'phoneNumber',
      validate: rowData => { return rowData.phoneNumber && isValidPhone(rowData.phoneNumber) ? { isValid: true } : { isValid: false, helperText: "Need valid Number" } }
    },
  ]);

  return (
    loading || loadingSave ? <div>Loading...</div> :
      error || errorSave || errorDelete ? <div className="error-message"> {error} </div> :
        <ul className="phonebook-content">
          <MaterialTable
            icons={tableIcons}
            options={
              {
                search: true,
                draggable: true,
                paging: true,
              }
            }
            title="Contacts"
            columns={columns}
            data={contacts}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  resolve();
                  return dispatch(saveContact({
                    name: newData.name, phoneNumber: newData.phoneNumber
                  }))
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  resolve();
                  return dispatch(saveContact({
                    _id: newData._id, name: newData.name, phoneNumber: newData.phoneNumber
                  }))

                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  resolve();
                  if (oldData._id) {
                    dispatch(deleteContact(oldData._id));
                  }

                }),
            }}
          />
        </ul>
  );
}

export default PhonebookScreen;