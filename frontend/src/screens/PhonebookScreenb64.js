import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listContacts, deleteContact, saveContact } from '../actions/contactActions';
import MaterialTable from 'material-table';
import FileBase64 from 'react-file-base64';
import tableIcons from '../components/util';
import Avatar from '@material-ui/core/Avatar';


function PhonebookScreen() {
  const [image, setImage] = useState([]);
  const getFiles = (files) => {
    setImage(files)
  };

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
    // if(image){
    //   setIsvalidImage(true)
    // }

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
    {
      title: 'Image',
      field: 'image',
      render: rowData => (<Avatar alt="Profile pic" src={rowData.image} />),
      editComponent: props => (
        <FileBase64
            multiple={true}
            onDone={getFiles} 
            /> 
      ),
      addComponent: props => (
        <FileBase64
          multiple={true}
          onDone={getFiles}
        />
      ),
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
                  if (image.length>0 && Number(image[0].size.split([" "])[0]) > 1024) {
                    alert('Image size must be less than 1mb')
                    return reject();
                  }
                  resolve();
                  return dispatch(saveContact({
                    name: newData.name, phoneNumber: newData.phoneNumber, image: image
                  }))
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  if (image.length>0 && Number(image[0].size.split([" "])[0]) > 1024) {
                    alert('Image size must be less than 1mb')
                    return reject();
                  }
                  resolve();
                  !image && getFiles([oldData.image]);
                  return dispatch(saveContact({
                    _id: newData._id, name: newData.name, phoneNumber: newData.phoneNumber, image: image
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