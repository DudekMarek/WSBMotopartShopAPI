import Customer from "../models/customerModel.js";

function get(req, res, next) {
  Customer.findAll()
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      console.error(`Error fetching users: ${err}`);
      res.status(500).json({ error: err });
    });
}

function create(req, res, next) {
  const customer = req.body;
  if (!customer || !customer.firstName || !customer.lastName) {
    res.status(400).json({ error: "Incomplete or invalid customer data" });
  }

  Customer.create(customer)
    .then((customer) => {
      res.json({ message: "Customer created", customer: customer });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

function remove(req, res, next) {
  const customerId = req.params.id;

  Customer.findByPk(customerId)
    .then((customer) => {
      if (!customer) {
        res.status(404).json({ error: "Customer not found" });
      } else {
        return customer.destroy();
      }
    })
    .then(() => {
      res
        .status(200)
        .json({ message: `Customer with Id: ${customerId} deleted` });
    })
    .catch((err) => {
      console.error(`Error while deleting customer: ${err}`);
      res.status(500).json({ error: err });
    });
}

function update(req, res, next) {
  const customerId = req.params.id;
  const updatedCustomer = req.body;

  Customer.findByPk(customerId)
    .then((customer) => {
      if (!customer) {
        res.status(404).json({ message: "Customer not found" });
      } else {
        return customer.update();
      }
    })
    .then(() => {
      res.json(updatedCustomer);
    })
    .catch((err) => {
      console.error(`Error while updating customer: ${err}`);
      res.status(500).json({ error: err });
    });
}

export { get, create, remove, update };
