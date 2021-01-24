from flask import Flask, render_template, url_for

from flask import Flask, render_template
from flask_bootstrap import Bootstrap

import os
import cv2
import tensorflow as tf
from flask import Flask, request, redirect, url_for, render_template, flash
from werkzeug.utils import secure_filename
from keras.models import Sequential, load_model
from keras.preprocessing import image

import numpy as np


classes = ["笑顔","not 笑顔"]
num_classes = len(classes)
image_size = 50
image_size2 = 50

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSION = ["png", "jpg", "jpeg", "gif"]

def allowed_file(filename):
	return "." in filename and filename.split(".")[1].lower() in ALLOWED_EXTENSION

model = load_model("vgg1.h5")

graph = tf.get_default_graph()



app = Flask(__name__)
bootstrap = Bootstrap(app)

@app.route('/',methods = ["GET","POST"])
def hello_world():
    global graph
    with graph.as_default():
        if request.method == 'POST':
            if "file" not in request.files:
                flash("ファイルがありません")
                return redirect(request.url)
            file = request.files["file"]
            
            if file and allowed_file(file.filename):
                
                filename = secure_filename(file.filename)
                file.save(os.path.join(UPLOAD_FOLDER, filename))
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                
                img = image.load_img(filepath,grayscale = False, target_size = (image_size,image_size2))
                img = image.img_to_array(img)
                data = np.array([img])
                result = model.predict(data)[0]
                predicted = result.argmax()
                pred_answer = "これは" + classes[predicted] + "です"
                
                return render_template("bootstrap_html.html",answer = pred_answer)
                                
    
    return render_template('bootstrap_html.html')


if __name__ == '__main__':
    app.run(debug=True)