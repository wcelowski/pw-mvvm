@startuml
actor User as User

User -> View: addItem
View -> ViewModel: addItem
group data-binding
ViewModel -> Observable: setValue(new Model)
Observable --> ViewModel: notify()
ViewModel -> View: applyForEach
end
@enduml