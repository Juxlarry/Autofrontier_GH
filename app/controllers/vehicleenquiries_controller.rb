class VehicleenquiriesController < ApplicationController
  before_action :set_vehicleenquiry, only: %i[ show edit update destroy ]

  # GET /vehicleenquiries or /vehicleenquiries.json
  def index
    @vehicleenquiries = Vehicleenquiry.all.order('id desc')

    # logger.info "enquiries -- #{@vehicleenquiries.inspect}"
  end

  def view_enquiry 
    enquiry_id = params[:id]
    
    logger.info "view_enquiry id --- #{enquiry_id}"
    @view_enquiry_made = Vehicleenquiry.where(:id => enquiry_id)

    logger.info "::::view_enquiry details --- #{@view_enquiry_made[0].inspect}"

    logger.info "This very enquiry --- #{@view_enquiry_made[0].firstname}"

    @enquirer_firstname = @view_enquiry_made[0].firstname
    @enquirer_email = @view_enquiry_made[0].email
    @enquirer_message = @view_enquiry_made[0].message
    @enquirer_phone = @view_enquiry_made[0].phonenumber

    respond_to do |format|

      format.html
      format.js
    end
  end 


  def assign_a_patient
    @assign_patient = AssignPatient.new
    patient_id=params[:id]

    logger.info "Lets see id para #{patient_id}"

    @patient = Patient.new
    @records = Patient.find_by(id: patient_id)

    logger.info "Lets see the records"
    logger.info "record: #{@records.inspect}"

    @patient_id = @records.id
    patient_id = @patient_id
    logger.info "patient id: #{@patient_id}"

    @check_insurance = @records.insurance_cash
    @check_card = @records.card_no
    logger.info "patient CASH OR INSURANCE: #{@check_insurance}"
     logger.info "patient card_no: #{@check_card}"

    

    respond_to do |format|

      format.html
      format.js
    end

  end

  # GET /vehicleenquiries/1 or /vehicleenquiries/1.json
  def show
  end

  # GET /vehicleenquiries/new
  def new
    @vehicleenquiry = Vehicleenquiry.new
  end

  # GET /vehicleenquiries/1/edit
  def edit
  end

  # POST /vehicleenquiries or /vehicleenquiries.json
  def create
    @vehicleenquiry = Vehicleenquiry.new(vehicleenquiry_params)

    respond_to do |format|
      if @vehicleenquiry.save
        format.html { redirect_back fallback_location: '/', notice: "Vehicleenquiry was successfully created." }
        format.json { render :show, status: :created, location: @vehicleenquiry }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @vehicleenquiry.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /vehicleenquiries/1 or /vehicleenquiries/1.json
  def update
    respond_to do |format|
      if @vehicleenquiry.update(vehicleenquiry_params)
        format.html { redirect_to @vehicleenquiry, notice: "Vehicleenquiry was successfully updated." }
        format.json { render :show, status: :ok, location: @vehicleenquiry }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @vehicleenquiry.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /vehicleenquiries/1 or /vehicleenquiries/1.json
  def destroy
    @vehicleenquiry.destroy
    respond_to do |format|
      format.html { redirect_to vehicleenquiries_url, notice: "Vehicleenquiry was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_vehicleenquiry
      @vehicleenquiry = Vehicleenquiry.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def vehicleenquiry_params
      params.require(:vehicleenquiry).permit(:firstname, :lastname, :email, :phonenumber, :message, :status, :enquirer_user_id, :vehicle_user_id)
    end
end
