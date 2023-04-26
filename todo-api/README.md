# Get all todos
http GET localhost:3000/todos

# Get a single todo by id
http GET localhost:3000/todos/1

# Create a new todo
http POST localhost:3000/todos title='Buy milk'

# Update an existing todo
http PUT localhost:3000/todos/1 title='Buy soy milk'

# Delete an existing todo
http DELETE localhost:3000/todos/1