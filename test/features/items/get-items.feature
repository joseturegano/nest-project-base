Feature: Obtener Items
  Como usuario de la API
  Quiero poder obtener la lista de items activos
  Para poder visualizar la información disponible

  Scenario: Obtener lista de items activos
    Given que existen items en la base de datos
    When realizo una petición GET a "/api/items"
    Then debería recibir un código de estado 200
    And debería recibir solo los items activos
    And los items deberían tener los campos requeridos
