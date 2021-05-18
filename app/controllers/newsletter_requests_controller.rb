class NewsletterRequestsController < ApplicationController
  before_action :set_newsletter_request, only: %i[ show edit update destroy ]

  # GET /newsletter_requests or /newsletter_requests.json
  def index
    @newsletter_requests = NewsletterRequest.all
  end

  # GET /newsletter_requests/1 or /newsletter_requests/1.json
  def show
  end

  # GET /newsletter_requests/new
  def new
    @newsletter_request = NewsletterRequest.new
  end

  # GET /newsletter_requests/1/edit
  def edit
  end

  # POST /newsletter_requests or /newsletter_requests.json
  def create
    @newsletter_request = NewsletterRequest.new(newsletter_request_params)

    respond_to do |format|
      if @newsletter_request.save
        format.html { redirect_back fallback_location: '/', notice: "Newsletter request was successfully created." }
        format.json { render :show, status: :created, location: @newsletter_request }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @newsletter_request.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /newsletter_requests/1 or /newsletter_requests/1.json
  def update
    respond_to do |format|
      if @newsletter_request.update(newsletter_request_params)
        format.html { redirect_to @newsletter_request, notice: "Newsletter request was successfully updated." }
        format.json { render :show, status: :ok, location: @newsletter_request }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @newsletter_request.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /newsletter_requests/1 or /newsletter_requests/1.json
  def destroy
    @newsletter_request.destroy
    respond_to do |format|
      format.html { redirect_to newsletter_requests_url, notice: "Newsletter request was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_newsletter_request
      @newsletter_request = NewsletterRequest.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def newsletter_request_params
      params.require(:newsletter_request).permit(:email, :status)
    end
end
