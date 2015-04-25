express = require 'express'
ejs     = require 'ejs'
http    = require 'http'

app = express()

app.set 'views', '#{__dirname}/views'
app.set 'view engine', 'html'
app.engine '.html', ejs.__express
app.use express.logger('dev')
app.use express.bodyParser()
app.use express.methodOverride()
app.use express.cookieParser('herpderplolz')
app.use express.session()
app.use app.router
app.use express.static "#{__dirname}/static"
app.use express.errorHandler()

app.get "/", (req, res) ->
  res.render "#{__dirname}/views/index"

app.get "/students/homework.php", (req, res) ->
  res.render "#{__dirname}/views/homework"

app.get "/students/course-detail.php*", (req, res) ->
  res.render "#{__dirname}/views/#{req.query.course_id}"

app.get "/students*", (req, res) ->
  if req.session.logged_in
    res.redirect "/students/homework.php"
  else
    res.render "#{__dirname}/views/students",
      mosmsg: req.query.mosmsg

app.post "/students/index.php", (req, res) ->
  if req.body.Email is "bin.go@jbha.org" and req.body.Passwd is "bingo"
    console.log "Auth successful"
    req.session.logged_in = true
    res.cookie 'PHPSESSID', 'bpkja79ah370o2p1efoof2irl2'
    res.cookie 'd95f2ae91fb685ef08a136a5f34c410e', '9c252a1f61b6969e4eefdf60992c34d0'
    res.redirect 301, "/students/homework.php"
  else
    console.log "Auth failed"
    res.redirect "/students?mosmsg=You+are+not+a+currently+enrolled+student."

http.createServer(app).listen 80, ->
  console.log "Barrking up a storm: http://localhost"