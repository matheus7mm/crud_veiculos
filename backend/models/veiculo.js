const mongoose = require('mongoose');

const veiculoSchema = mongoose.Schema({
  placa: { type: String, required: true, unique: true },
  chassi: { type: String, required: true, unique: true },
  renavam: { type: Number, required: true, unique: true },
  modelo: { type: String, required: true},
  marca: { type: String, required: true},
  ano: { type: Number, required: true}
});

module.exports = mongoose.model('Veiculo', veiculoSchema);
