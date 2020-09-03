import express from 'express';
import Contact from '../models/contactModel';
import { isValidPhone } from '../util';

const router = express.Router()

router.get("/", async (req, res) => {
    const contacts = await Contact.find({});
    res.send(contacts);
});

router.get('/:id', async (req, res) => {
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId);

    if (contact) {
        return res.status(200).send(contact);
    }
    else {
        res.status(404).send({ msg: "Contact Note found" });
    }

});


router.post("/", async (req, res, next) => {

    if (req.body.name && req.body.phoneNumber) {

        if (isValidPhone(req.body.phoneNumber)) {
            try {
                const contact = new Contact({
                    name: req.body.name,
                    phoneNumber: req.body.phoneNumber,
                });
                const newContact = await contact.save();

                if (newContact) {
                    return res.status(201).send({ message: "Contact created successfully", data: newContact });
                }
            } catch (error) {
                return res.status(500).send({ message: "Error in creaing contact", error: error });
            }

        } else {
            return res.status(400).send({ message: "Phone number is not valid" });

        }

    } else {
        return res.status(400).send({ message: "Name or Phone number missing" });
    }

});



router.put("/:id", async (req, res) => {

    if (req.body.name || req.body.phoneNumber) {
        const contactId = req.params.id;
        const contact = await Contact.findById(contactId);
        if (contact) {
            contact.name = req.body.name ? req.body.name : contact.name;
            contact.phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : contact.phoneNumber;
    
            if (isValidPhone(req.body.phoneNumber)) {
                const updateContact = await contact.save();
                if (updateContact) {
                    return res.status(200).send({ message: "Contact updated successfully", data: updateContact });
                }
            } else {
                return res.status(400).send({ message: "Phone number is not valid" });
            }
        }
        return res.status(500).send({ message: "Error in updating contact" });
    }
    


});

router.delete("/:id", async (req, res) => {

    const contactId = req.params.id;
    const deleteContact = await Contact.findById(contactId);

    if (deleteContact) {
        await deleteContact.remove();
        res.send({ message: "Contact deleted successfully" });
    } else {
        res.send({ message: "Error in contact deletion" });
    }

});


export default router;
