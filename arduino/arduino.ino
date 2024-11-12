#include <Stepper.h>

#define PASSOS 64

int aberto = 0;
char comando;

Stepper myStepper(PASSOS, 8, 10, 9, 11);

void setup() {
  Serial.begin(9600);
  myStepper.setSpeed(500);
  digitalWrite(8, LOW);
}

void desligaMotor() {
  digitalWrite(8, LOW);
  digitalWrite(10, LOW);
  digitalWrite(9, LOW);
  digitalWrite(11, LOW);
}

void loop() {
  if (Serial.available()) {
    comando = Serial.read();
    Serial.println(comando);

    switch (comando) {
      case 'A':
        abrir();
        break;
      case 'F':
        fechar();
        break;
      case 'S':
        estadoCortina();
        break;
    }
  }
}

void abrir() {
  if (aberto == 0) {
    Serial.println("Abrindo cortina!");
    for (int i = 0; i < 40; i++) {
      myStepper.step(-PASSOS);
    }
    aberto = 1;
    desligaMotor();
  }
}

void fechar() {
  if (aberto == 1) {
    Serial.println("Fechando cortina!");
    for (int i = 0; i < 40; i++) {
      myStepper.step(PASSOS);
    }
    aberto = 0;
    desligaMotor();
  }
}

void estadoCortina() {
  Serial.println(aberto);
}