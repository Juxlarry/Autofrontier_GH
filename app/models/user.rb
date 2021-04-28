class User < ApplicationRecord
    devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :validatable

    belongs_to :a_role, class_name: 'Role', foreign_key: :role_id

    attr_writer :login
    validate :validate_username 

    def validate_username
        if User.where(email: username).exists?
            errors.add(:username, :invalid)
        end
    end 


    def displayname 
        #getting email of user -> [username :0] [email provider : 1]
        return self.email.split('@')[0].capitalize
    end
end
