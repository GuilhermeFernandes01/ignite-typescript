# Cadastro de carro

**Requisitos Funcionais**
Deve ser possível cadastrar um novo carro.

**Regras de negócio**
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado, por padrão, com disponibilidade de aluguel.
* Somente administradores podem cadastrar carros.

# Listagem de carros

**Requisito Funcional**
Deve ser possível todos os carros disponíveis.
Deve ser possível todos os carros disponíveis pela categoria.
Deve ser possível todos os carros disponíveis pela marca.
Deve ser possível todos os carros disponíveis pelo nome do carro.

**Regra de negócio**
O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro

**Requisitos Funcionais**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.


**Regras de negócio**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
Somente administradores podem cadastrar especificações.

# Cadastro de imagens do carro
**Requisitos Funcionais**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**Requisitos Não Funcionais**
Utilizar o multer para upload dos arquivos.

**Regras de negócio**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
Somente administradores podem cadastrar imagens do carro.

# Aluguel de carro
**Requisitos Funcionais**
Deve ser possível cadastrar um aluguel.

**Regras de negócio**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um aluguel caso já exista um aberto para um mesmo usuário.
Não deve ser possível cadastrar um aluguel caso já exista um aberto para um mesmo carro.
