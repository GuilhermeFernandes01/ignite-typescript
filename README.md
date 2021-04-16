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
O usuário deve estar logado na aplicação.
Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

# Devolução de carro
**Requisitos Funcionais**
Deve ser possível realizar a devolução de um carro.

**Regras de negócio**
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.
O usuário deve estar logado na aplicação.

# Listagem de aluguéis para usuário
**Requisitos Funcionais**
Deve ser possível realizar a busca de todos os aluguéis para o usuário.

**Regras de negócio**
O usuário deve estar logado na aplicação.

# Recuperar senha
**Requisitos Funcionais**
Deve ser possível o usuário recuperar a senha informando o e-mail.
O usuário deve receber um e-mail com o passo a passo para a recuperação de senha.
O usuário deve conseguir inserir uma nova senha.

**Regras de negócio**
O usuário precisa informar uma nova senha.
O link enviado para a recuperação deve expirar em 3 horas.