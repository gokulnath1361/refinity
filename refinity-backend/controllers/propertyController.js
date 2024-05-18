const Property = require('../models/Property');

exports.addProperty = async (req, res) => {
    const { address, city, price, numberOfBedrooms, numberOfBathrooms,nearbyHospitals,nearbyColleges,} = req.body;

    try {
        const property = new Property({
            owner: req.user.id,
            address,
            city,
            price,
            numberOfBedrooms,
            numberOfBathrooms,
            nearbyHospitals,
            nearbyColleges,
        });

        await property.save();
        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getProperties = async (req, res) => {
    try {
        const properties = await Property.find().populate('owner', 'name email');
        res.json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('owner', 'name email');
        if (!property) {
            return res.status(404).json({ msg: 'Property not found' });
        }
        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateProperty = async (req, res) => {
    const { address, city, price, status } = req.body;

    try {
        let property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ msg: 'Property not found' });
        }

        if (property.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        property = await Property.findByIdAndUpdate(
            req.params.id,
            { $set: { address, city, price, status } },
            { new: true }
        );

        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ msg: 'Property not found' });
        }

        if (property.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await property.deleteOne();

        res.json({ msg: 'Property removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getOwnerProperty = async (req, res) => {
    try {
        const properties = await Property.find({ owner: req.params.id }).populate('owner');
        res.status(200).json(properties);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

