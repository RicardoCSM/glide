import serial
import falcon
import json
import datetime
import time
import threading
from falcon_cors import CORS

while True:
    try:
        arduino = serial.Serial('/dev/ttyUSB0', 9600)
        print('Arduino conectado')
        break
    except:
        pass

horario_abertura = datetime.time(8, 0)
horario_fechamento = datetime.time(18, 0)
aberto = 0

class RecursoAbrirCortina:
    resposta = {"status": 1, "message": "Cortina aberta!"}
    
    def on_post(self, req, resp):
        global aberto
        arduino.write('A'.encode())
        arduino.flush()
        aberto = 1
        resp.text = json.dumps(self.resposta)

class RecursoFecharCortina:
    resposta = {"status": 1, "message": "Cortina fechada!"}
    
    def on_post(self, req, resp):
        global aberto
        arduino.write('F'.encode())
        arduino.flush()
        aberto = 0
        resp.text = json.dumps(self.resposta)

class RecursoDefinirHorarioAbertura:
    def on_post(self, req, resp):
        global horario_abertura
        dados = json.load(req.bounded_stream)
        horario = dados.get("horario_abertura")
        if horario:
            horario_abertura = datetime.datetime.strptime(horario, '%H:%M').time()
            resp.text = json.dumps({"status": 1, "message": f"Horário de abertura definido para {horario_abertura}!"})
        else:
            resp.text = json.dumps({"status": 0, "message": "Horário de abertura inválido!"})

class RecursoDefinirHorarioFechamento:
    def on_post(self, req, resp):
        global horario_fechamento
        dados = json.load(req.bounded_stream)
        horario = dados.get("horario_fechamento")
        if horario:
            horario_fechamento = datetime.datetime.strptime(horario, '%H:%M').time()
            resp.text = json.dumps({"status": 1, "message": f"Horário de fechamento definido para {horario_fechamento}!"})
        else:
            resp.text = json.dumps({"status": 0, "message": "Horário de fechamento inválido!"})

class RecursoEstadoCortina:
    def on_get(self, req, resp):
        estado = {
            "aberto": aberto,
            "horario_abertura": horario_abertura.strftime('%H:%M'),
            "horario_fechamento": horario_fechamento.strftime('%H:%M')
        }
        resp.text = json.dumps({"status": 1, "response": estado})

def verificar_horario_cortina():
    global horario_abertura, horario_fechamento, aberto
    while True:
        horario_atual = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=-3))).time()
        if horario_abertura and horario_atual >= horario_abertura and (horario_atual < (datetime.datetime.combine(datetime.date.today(), horario_abertura) + datetime.timedelta(minutes=1)).time()):
            arduino.write('A'.encode())
            arduino.flush()
            time.sleep(60)
        if horario_fechamento and horario_atual >= horario_fechamento and (horario_atual < (datetime.datetime.combine(datetime.date.today(), horario_fechamento) + datetime.timedelta(minutes=1)).time()):
            arduino.write('F'.encode())
            arduino.flush()
            time.sleep(60)
        time.sleep(60)

thread_horario = threading.Thread(target=verificar_horario_cortina, daemon=True)
thread_horario.start()

cors = CORS(
    allow_all_origins=True,
    allow_all_methods=True,
    allow_all_headers=True,
)

api = falcon.App(middleware=[cors.middleware])
api.add_route('/open', RecursoAbrirCortina())
api.add_route('/close', RecursoFecharCortina())
api.add_route('/set_open_time', RecursoDefinirHorarioAbertura())
api.add_route('/set_close_time', RecursoDefinirHorarioFechamento())
api.add_route('/status', RecursoEstadoCortina())

if __name__ == "__main__":
    import waitress
    waitress.serve(api, host="0.0.0.0", port=8000)