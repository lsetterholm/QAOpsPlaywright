Feature: Ecommerce validations
    @Validation
    Scenario Outline: Placing the Order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        When Verify Error message is displayed

        Examples:
        |   username    |   password      |
        |rahulshetty    |Learning@830$3mK2|
        |rahulshetty    |Learning@830$3mK2|