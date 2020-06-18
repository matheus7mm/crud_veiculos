const express = require("express");

const Veiculo = require("../models/veiculo");

const router = express.Router();

router.post("", (req, res, next) => {
  const veiculo = new Veiculo({
    placa: req.body.placa,
    chassi: req.body.chassi,
    renavam: req.body.renavam,
    modelo: req.body.modelo,
    marca: req.body.marca,
    ano: req.body.ano
  });
  veiculo.save()
    .then((veiculoCriado) => {
      res.status(201).json({
        message: 'Veículo criado com sucesso!',
        veiculoId: veiculoCriado._id
      });
    });
});

router.put("/:id", (req, res, next) => {
  const veiculo = new Veiculo({
    _id: req.body.id,
    placa: req.body.placa,
    chassi: req.body.chassi,
    renavam: req.body.renavam,
    modelo: req.body.modelo,
    marca: req.body.marca,
    ano: req.body.ano
  });
  Veiculo.updateOne({ _id: req.params.id }, veiculo)
    .then((result) => {
      res.status(200).json({ message: 'Veículo alterado com sucesso!' })
    });
});

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const veiculoQuery = Veiculo.find();
  let fetchedVeiculos;
  if (pageSize && currentPage) {
    veiculoQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  veiculoQuery
    .then(documents => {
      fetchedVeiculos = documents;
      return Veiculo.count();
    })
    .then(count => {
      res.status(200).json({
        message: 'Veículos retornados com sucesso!',
        veiculos: fetchedVeiculos,
        maxVeiculos: count
      });
    });
});

router.get("/:id", (req, res, next) => {
  Veiculo.findById(req.params.id)
    .then((veiculo) => {
      if (veiculo) {
        res.status(200).json(veiculo);
      } else {
        res.status(404).json({
          message: 'Veículo não encontrado!'
        });
      }
    });
});

router.delete("/:id", (req, res, next) => {
  Veiculo.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: 'Veículo excluído com sucesso!' });
    });
});

module.exports = router;
