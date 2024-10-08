from flask import Flask, render_template, request, jsonify
from morse_code import english_to_morse, morse_to_english

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    text = data['text']
    direction = data['direction']

    if direction == 'english_to_morse':
        result = english_to_morse(text)
    else:
        result = morse_to_english(text)

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
